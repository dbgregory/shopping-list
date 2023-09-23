package handler

import (
	"encoding/json"
	"errors"
	"github.com/dbgregory/shopping-list/domain"
	"github.com/dbgregory/shopping-list/usecase"
	"github.com/go-chi/chi/v5"
	"net/http"
	"sort"
	"strconv"
	"strings"
)

var (
	BadRequestErr   = errors.New(http.StatusText(http.StatusBadRequest))
	MissingParamErr = errors.New("missing url parameter")
	NotAnIntErr     = errors.New("item index must be an integer")
	NotBoolErr      = errors.New("value must be true or false")
	ItemNotFoundErr = errors.New("item not found")
	CannotUpdateErr = errors.New("cannot update item at index")
	EmptyIDErr      = errors.New("id cannot be empty")
)

type ItemHandler struct {
	uc *usecase.ItemUseCase
}

func NewItemHandler(uc *usecase.ItemUseCase) *ItemHandler {
	return &ItemHandler{uc: uc}
}

func (h *ItemHandler) All(w http.ResponseWriter, _ *http.Request) {
	items, err := h.uc.AllItems()
	if err != nil {
		internalErr(w)
		return
	}
	jsonResponse(w, http.StatusOK, sortByTime(items))
}

func (h *ItemHandler) Add(w http.ResponseWriter, r *http.Request) {
	i, err := parseItem(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	item, err := h.uc.CreateOrUpdate(i.Init())
	if err != nil {
		internalErr(w)
		return
	}

	jsonResponse(w, http.StatusOK, item)
}

func (h *ItemHandler) Edit(w http.ResponseWriter, r *http.Request) {
	i, err := parseItem(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if i.ID == "" {
		http.Error(w, EmptyIDErr.Error(), http.StatusBadRequest)
		return
	}

	exists, err := h.uc.Exists(i.ID)
	if err != nil {
		internalErr(w)
		return
	}

	if !exists {
		http.Error(w, ItemNotFoundErr.Error(), http.StatusNotFound)
		return
	}

	item, err := h.uc.Item(i.ID)
	if err != nil {
		internalErr(w)
		return
	}

	if item.Quantity != i.Quantity {
		item.UpdateQty(i.Quantity)
	}
	item.Name = i.Name
	item.Description = i.Description

	_, err = h.uc.CreateOrUpdate(item)
	if err != nil {
		internalErr(w)
		return
	}

	jsonResponse(w, http.StatusOK, item)
}

func (h *ItemHandler) RemoveIndex(w http.ResponseWriter, r *http.Request) {
	id, idx, err := removeIndexParams(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	exists, err := h.uc.Exists(id)
	if err != nil {
		internalErr(w)
		return
	}

	if !exists {
		http.Error(w, ItemNotFoundErr.Error(), http.StatusNotFound)
		return
	}

	item, err := h.uc.Item(id)
	if err != nil {
		internalErr(w)
		return
	}

	if idx > item.Quantity-1 {
		http.Error(w, CannotUpdateErr.Error(), http.StatusBadRequest)
		return
	}

	if item.Quantity == 1 {
		err = h.uc.Remove(id)
		if err != nil {
			internalErr(w)
			return
		}
		jsonResponse(w, http.StatusOK, item.ID)
		return
	}

	_, err = h.uc.CreateOrUpdate(item.RemoveAt(idx))
	if err != nil {
		internalErr(w)
		return
	}
	jsonResponse(w, http.StatusOK, item)
}

func (h *ItemHandler) UpdatePurchased(w http.ResponseWriter, r *http.Request) {
	id, idx, val, err := updatePurchasedParams(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	exists, err := h.uc.Exists(id)
	if err != nil {
		internalErr(w)
		return
	}

	if !exists {
		http.Error(w, ItemNotFoundErr.Error(), http.StatusNotFound)
		return
	}

	item, err := h.uc.Item(id)
	if err != nil {
		internalErr(w)
		return
	}

	if idx > item.Quantity-1 {
		http.Error(w, CannotUpdateErr.Error(), http.StatusBadRequest)
	}

	item.Purchased[idx] = val
	_, err = h.uc.CreateOrUpdate(item)
	if err != nil {
		internalErr(w)
		return
	}
	jsonResponse(w, http.StatusOK, item)
}

/**
Helpers
*/

func removeIndexParams(r *http.Request) (id string, index int, err error) {
	id = chi.URLParam(r, "id")
	if id == "" {
		return "", 0, MissingParamErr
	}
	index, err = intParam(r, "index")
	if err != nil {
		return "", 0, err
	}
	return
}

func updatePurchasedParams(r *http.Request) (id string, index int, val bool, err error) {
	id = chi.URLParam(r, "id")
	if id == "" {
		return "", 0, false, MissingParamErr
	}
	index, err = intParam(r, "index")
	if err != nil {
		return "", 0, false, err
	}
	val, err = boolParam(r, "value")
	if err != nil {
		return "", 0, false, err
	}
	return
}

func boolParam(r *http.Request, key string) (bool, error) {
	val := chi.URLParam(r, key)
	if val == "" {
		return false, MissingParamErr
	}
	switch strings.ToLower(val) {
	case "true":
		return true, nil
	case "false":
		return false, nil
	default:
		return false, NotBoolErr
	}
}

func intParam(r *http.Request, key string) (int, error) {
	val := chi.URLParam(r, key)
	if val == "" {
		return 0, MissingParamErr
	}
	n, err := strconv.ParseInt(val, 10, 64)
	if err != nil {
		return 0, NotAnIntErr
	}
	return int(n), nil
}

func parseItem(r *http.Request) (*domain.Item, error) {
	item := &domain.Item{}
	if err := json.NewDecoder(r.Body).Decode(item); err != nil {
		return nil, BadRequestErr
	}
	if err := item.Validate(); err != nil {
		return nil, err
	}
	return item, nil
}

func jsonResponse(w http.ResponseWriter, statusCode int, payload interface{}) {
	res, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_, _ = w.Write(res)
}

func internalErr(w http.ResponseWriter) {
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

func sortByTime(items []*domain.Item) []*domain.Item {
	sort.Slice(items, func(i, j int) bool {
		return items[i].CreatedAt < items[j].CreatedAt
	})
	return items
}
