
let app = Vue.createApp({

})

app.component("meal", {
    //inline html
    template: `
    <div class="accordion-item">
        <div class="accordion-header d-flex" v-bind:id="pasto">
            <div class="d-flex">
                <button type="button" class="btn btn-success plus-button" data-bs-toggle="modal" data-bs-target="#addModal"
                    onclick="vistaPasto()">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#'+collId"
                aria-expanded="false" v-bind:aria-controls="collId">
                <h5 class="m-0 nomepasto">{{pasto}}</h5>
            </button>
        </div>
        <div v-bind:id="collId" class="accordion-collapse collapse text-center" v-bind:aria-labelledby="pasto"
        data-bs-parent="#accordionExample">
            <!-- header desktop view-->
            <div class="acc-header">
                <div class="row head-large">
                    <div class="col col-md-5">
                        <div class="row w-100">
                            <div class="col px-1 px-md-2" style="max-width: 50px;">&nbsp</div>
                            <div class="col">Alimento</div>
                        </div>
                    </div>
                    <div class="col">
                        Carboidrati
                    </div>
                    <div class="col">
                        Proteine
                    </div>
                    <div class="col">
                        Grassi
                    </div>
                    <div class="col text-black">
                        Calorie
                    </div>
                </div>
            </div>
            <!-- body tabella -->
            <div class="accordion-body" v-bind:id="bodyId">
                <!-- tabella alimenti pasto - zona dinamica-->
            </div>
        </div>
    </div>
    `,

    props: {
        //camelCase viene converito in kebab-case (html)
        pasto: {
            type: String
        },
        collId: {
            type: String
        },
        bodyId: {
            type: String
        }
    }
})

app.mount("#accordionMeals")