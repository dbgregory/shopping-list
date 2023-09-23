package domain

import (
	"errors"
	"fmt"
	"github.com/google/uuid"
	"strings"
	"time"
)

var (
	ZeroQtyErr         = errors.New("quantity cannot be 0")
	DescSizeErr        = errors.New("description cannot be more than 100 characters")
	emptyFieldTemplate = "field %s cannot be blank"
)

type Item struct {
	ID          string `json:"id,omitempty"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
	Purchased   []bool `json:"purchased,omitempty"`
	CreatedAt   int64  `json:"createdAt,omitempty"`
}

func (i *Item) Validate() error {
	i.Name = strings.TrimSpace(i.Name)
	i.Description = strings.TrimSpace(i.Description)
	switch {
	case i.Name == "":
		return fmt.Errorf(emptyFieldTemplate, "name")
	case i.Description == "":
		return fmt.Errorf(emptyFieldTemplate, "description")
	case i.Quantity == 0:
		return ZeroQtyErr
	case len(i.Description) > 100:
		return DescSizeErr
	default:
		return nil
	}
}

func (i *Item) Init() *Item {
	i.CreatedAt = time.Now().Unix()
	i.Purchased = make([]bool, i.Quantity)
	i.ID = uuid.New().String()
	return i
}

func (i *Item) RemoveAt(idx int) *Item {
	n := i.Quantity - 1
	if idx > n {
		return i
	}
	i.Quantity = n
	if idx == n {
		i.Purchased = i.Purchased[:idx]
		return i
	}
	i.Purchased = append(i.Purchased[:idx], i.Purchased[idx+1:]...)
	return i
}

func (i *Item) UpdateQty(q int) *Item {
	if q == 0 || q == i.Quantity {
		return i
	}
	if q < i.Quantity {
		i.Purchased = i.Purchased[:q]
	} else {
		p := make([]bool, q)
		for j, v := range i.Purchased {
			p[j] = v
		}
		i.Purchased = p
	}
	i.Quantity = q
	return i
}
