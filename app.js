
let app = Vue.createApp({

})

app.component("meal", {
    //inline html
    template: `
    <div class="accordion-item">
        <div class="accordion-header d-flex" v-bind:id="pasto">
            <button type="button" class="btn btn-success plus-button shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"
                onclick="vistaPasto()">
                <i class="bi bi-plus-lg"></i>
            </button>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#'+collId"
                aria-expanded="false" v-bind:aria-controls="collId">
                <span>{{pasto}}</span>
            </button>
        </div>
        <div v-bind:id="collId" class="accordion-collapse collapse" v-bind:aria-labelledby="pasto"
        data-bs-parent="#accordionExample">
            <div class="acc-header">
                <!-- header tabella alimento carb prot gra cal -->
            </div>
            <div class="accordion-body" v-bind:id="bodyId">
                <!-- tabella alimenti pasto -->
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
        bodyId:{
            type: String
        }
    }
})

app.mount("#accordionMeals")