export class Products {
    #products = [];
    #searchProducts = [];
    #filterProducts = [];
    #listFilters = [];
    #search = "";

    constructor() {
        this.listAllFilters = [
            "Eliminar Filtros",
            "Hamburguesas",
            "Pollo",
            "Salchipapas",
            "Desayuno",
            "Sushi",
            "Tacos",
            "Pastas",
            "Tortillas",
            "Pizzas",
            "Sandwiches",
            "Chifa",
            "Parrillas",
            "Ensaladas",
            "Tortas",
            "Jugos",
            "Aguas",
            "Gaseosas",
        ];
    }

    getListFilters() {
        return this.#listFilters;
    }

    setProducts(products) {
        this.#products = products;
        this.showProducts = this.#products;
    }

    resetSearch() {
        this.#searchProducts = [];
        this.#updateListProducts();
    }

    resetFilter() {
        this.#filterProducts = [];
        this.#updateListProducts();
    }

    removeFilter(type, filterName) {
        //? filter method return item when the value returned inside is equal to true.
        this.#listFilters = this.#listFilters.filter(
            (filter) => filter !== filterName
        );

        this.addProductsByFilter(type, this.#listFilters);
    }

    getProductsByName(name) {
        this.#searchProducts = this.#products.filter((product) =>
            // ! using toLowerCase method because the search input user may not be strict equal in sense of case sensitive to match something as it's expect.
            product.name.toLowerCase().includes(name.toLowerCase())
        );
        this.#search = name;
        this.#updateListProducts();
    }

    addProductsByFilter(type, values) {
        if (values.includes("Eliminar Filtros")) this.#filterProducts = [];
        else {
            switch (type) {
                case "category":
                    this.#filterProducts = this.#products.filter((product) => {
                        return values.includes(product.category);
                    });
                    break;
            }
        }
        this.#updateListProducts();
    }

    #updateListFilters() {
        const typeFilters = ["category"];

        // ? get all the filters
        typeFilters.forEach((type) => {
            this.#filterProducts.forEach((product) => {
                this.#listFilters.push(product[`${type}`]);
            });
        });

        // ? delete repetitive values from my array
        this.#listFilters = [...new Set(this.#listFilters)];
    }

    #updateListProducts() {
        const listsArraysEmpty = [
            this.#searchProducts.length === 0,
            this.#filterProducts.length === 0,
        ];
        if (listsArraysEmpty[0] && listsArraysEmpty[1]) {
            // no search & no filters
            this.showProducts = this.#products;
        } else if (listsArraysEmpty[0]) {
            // only filters
            this.showProducts = this.#filterProducts;
        } else if (listsArraysEmpty[1]) {
            //only search
            this.showProducts = this.#searchProducts;
        } else {
            // both search & filters
            //? filter in filterProducts for get the search products inside
            this.showProducts = this.#filterProducts.filter((product) => {
                // ! isn't mandatory use toLowerCase because both arrays of product contain the same format always
                return this.#searchProducts.includes(product);
            });
        }
        this.#updateListFilters();
    }
}
