package repository

import (
	"github.com/dbgregory/shopping-list/domain"
)

type ItemRepository interface {
	Set(item *domain.Item) (*domain.Item, error)
	Get(id string) (*domain.Item, error)
	Delete(id string) error
	GetAll() ([]*domain.Item, error)
	Exists(id string) (bool, error)
}
