package repository

import (
	"encoding/json"
	"github.com/dbgregory/shopping-list/domain"
	"github.com/tidwall/buntdb"
)

type BuntItemRepo struct {
	dbPath string
}

func NewBuntItemRepo(dbPath string) *BuntItemRepo {
	return &BuntItemRepo{
		dbPath: dbPath,
	}
}

func (r *BuntItemRepo) Set(item *domain.Item) (*domain.Item, error) {
	db, err := r.db()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	err = db.Update(func(tx *buntdb.Tx) error {
		b, err := json.Marshal(item)
		if err != nil {
			return err
		}
		_, _, err = tx.Set(item.ID, string(b), nil)
		return err
	})

	if err != nil {
		return nil, err
	}

	return item, nil
}

func (r *BuntItemRepo) Get(id string) (*domain.Item, error) {
	db, err := r.db()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	item := &domain.Item{}
	err = db.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(id)
		if err != nil {
			return err
		}
		return json.Unmarshal([]byte(val), item)
	})

	if err != nil {
		return nil, err
	}

	return item, nil
}

func (r *BuntItemRepo) Exists(id string) (bool, error) {
	_, err := r.Get(id)
	if err != nil {
		if err == buntdb.ErrNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func (r *BuntItemRepo) GetAll() ([]*domain.Item, error) {
	db, err := r.db()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	var items []*domain.Item
	err = db.View(func(tx *buntdb.Tx) error {
		size, err := tx.Len()
		if err != nil {
			return err
		}

		items = make([]*domain.Item, 0, size)
		err = tx.Ascend("", func(_, value string) bool {
			item := &domain.Item{}
			err = json.Unmarshal([]byte(value), item)
			if err != nil {
				return false
			}
			items = append(items, item)

			return true
		})

		return err
	})

	if err != nil {
		return nil, err
	}

	return items, nil
}

func (r *BuntItemRepo) Delete(id string) error {
	db, err := r.db()
	if err != nil {
		return err
	}
	defer db.Close()

	return db.Update(func(tx *buntdb.Tx) error {
		_, err = tx.Delete(id)
		return err
	})
}

func (r *BuntItemRepo) db() (*buntdb.DB, error) {
	return buntdb.Open(r.dbPath)
}
