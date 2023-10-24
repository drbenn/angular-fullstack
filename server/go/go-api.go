package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Go API Hello 🐹🐹🐹")
	})

	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello World!")
	})

	http.HandleFunc("/goodbye", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Goodbye!")
	})

	log.Println("Starting web server on port 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}

}
