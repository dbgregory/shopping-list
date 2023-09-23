package routes

import (
	"github.com/dbgregory/shopping-list/api/handler"
	"github.com/go-chi/chi/v5"
)

func RegisterItemRoutes(r chi.Router, h *handler.ItemHandler) {
	r.Route("/item", func(r chi.Router) {
		r.Get("/all", h.All)
		r.Post("/add", h.Add)
		r.Post("/edit", h.Edit)
		r.Post("/remove/{id}/{index}", h.RemoveIndex)
		r.Post("/purchased/{id}/{index}/{value}", h.UpdatePurchased)
	})
}
