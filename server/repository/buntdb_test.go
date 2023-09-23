package repository

import (
	"github.com/dbgregory/shopping-list/domain"
	"github.com/dbgregory/shopping-list/util"
	"github.com/tidwall/buntdb"
	"os"
	"reflect"
	"testing"
)

const testDB = "_test/test.db"

func Test_BuntItemRepo(t *testing.T) {
	repo := initTestRepo()

	t.Run("buntDB", func(t *testing.T) {

		t.Run("Set/Get/Delete", func(t *testing.T) {
			item := createItem()

			_, err := repo.Set(item)
			if err != nil {
				t.Fatal(err)
			}

			i, err := repo.Get(item.ID)
			if err != nil {
				t.Fatal(err)
			}
			if !reflect.DeepEqual(i, item) {
				t.Fatal("items are not equal")
			}

			err = repo.Delete(item.ID)
			if err != nil {
				t.Fatal(err)
			}

		})

		t.Run("GetAll", func(t *testing.T) {
			all, err := repo.GetAll()
			if err != nil {
				t.Fatal(err)
			}
			if len(all) < 5 {
				t.Fatal("item count should be >= 5")
			}
		})

		t.Run("UpdatePurchased", func(t *testing.T) {
			all, err := repo.GetAll()
			if err != nil {
				t.Fatal(err)
			}

			item := all[0]
			updateIDX := 3

			item.Purchased[updateIDX] = true

			_, err = repo.Set(item)
			if err != nil {
				t.Fatal(err)
			}

			i, err := repo.Get(item.ID)
			if err != nil {
				t.Fatal(err)
			}
			if !reflect.DeepEqual(i, item) {
				t.Fatal("items are not equal")
			}
		})

	})

	cleanup()
}

func initTestRepo() *BuntItemRepo {
	_ = os.Mkdir("_test", os.ModePerm)
	repo := NewBuntItemRepo(testDB)
	for i := 0; i < 5; i++ {
		_, err := repo.Set(createItem())
		util.PanicOnErr(err)
	}
	return repo
}

func createItem() *domain.Item {
	i := &domain.Item{
		Name:        "Tomatoes",
		Description: "Green cherry tomatoes",
		Quantity:    5,
	}
	return i.Init()
}

func cleanup() {
	db, err := buntdb.Open(testDB)
	util.PanicOnErr(err)
	err = db.Update(func(tx *buntdb.Tx) error {
		return tx.DeleteAll()
	})
	util.PanicOnErr(err)
}
