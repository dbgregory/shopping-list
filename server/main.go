package main

import (
	"fmt"
	"github.com/dbgregory/shopping-list/api"
	"github.com/dbgregory/shopping-list/util"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func main() {
	conf, err := util.LoadConfig()
	util.PanicOnErr(err)

	serve(conf)
}

func serve(conf *util.Config) {
	r := chi.NewRouter()
	api.Setup(r, conf)
	fmt.Println("Now listening on http://localhost:" + conf.HTTPPort)
	if err := http.ListenAndServe(":"+conf.HTTPPort, r); err != nil {
		fmt.Println(err)
	}
}
