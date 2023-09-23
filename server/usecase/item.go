package usecase

import (
	"github.com/dbgregory/shopping-list/domain"
	"github.com/dbgregory/shopping-list/repository"
)

type ItemUseCase struct {
	r repository.ItemRepository
}

func NewItemUseCase(r repository.ItemRepository) *ItemUseCase {
	return &ItemUseCase{r: r}
}

func (i *ItemUseCase) Exists(id string) (bool, error) {
	return i.r.Exists(id)
}

func (i *ItemUseCase) CreateOrUpdate(item *domain.Item) (*domain.Item, error) {
	return i.r.Set(item)
}

func (i *ItemUseCase) Remove(id string) error {
	return i.r.Delete(id)
}

func (i *ItemUseCase) Item(id string) (*domain.Item, error) {
	return i.r.Get(id)
}

func (i *ItemUseCase) AllItems() ([]*domain.Item, error) {
	return i.r.GetAll()
}
