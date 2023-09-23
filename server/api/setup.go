package api

import (
	"github.com/dbgregory/shopping-list/api/handler"
	"github.com/dbgregory/shopping-list/api/routes"
	"github.com/dbgregory/shopping-list/repository"
	"github.com/dbgregory/shopping-list/usecase"
	"github.com/dbgregory/shopping-list/util"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func Setup(r chi.Router, conf *util.Config) {
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://*"},
	}))

	routes.RegisterItemRoutes(r, handler.NewItemHandler(usecase.NewItemUseCase(repository.NewBuntItemRepo(conf.DBFile))))
}
