client.request("/api/v2/ticket_fields.json").then((res) => {
    console.log("custom fields", res);
})
const llenarData = async () => {
    let res = await client.request("/api/v2/ticket_forms.json")
    let ticket_forms = res.ticket_forms
    console.log(res);
    for (let i = 0; i < ticket_forms.length; i++) {
        let ticket_fields = []
        let form = ticket_forms[i]
        let campo_de_ticket = {}
        for (let j = 0; j < form.ticket_field_ids.length; j++) {
            let id = form.ticket_field_ids[j]
            let ticketField = await client.request(`/api/v2/ticket_fields/${id}.json`)
            let ticket_field = ticketField.ticket_field
            let opciones = []
            let opcion = {}
            campo_de_ticket.id_campo = ticket_field.id
            campo_de_ticket.nombre_campo = ticket_field.title
            campo_de_ticket.tipo = ticket_field.type
            if (ticket_field.type == "tagger") {

                ticket_field.custom_field_options.map((campo) => {
                    opcion = {}
                    opcion.id_opcion = campo.id
                    opcion.etiqueta_opcion = campo.raw_name
                    opcion.valor_opcion = campo.value
                    opciones.push(opcion)
                })
                campo_de_ticket.desplegable = opciones

            }
            ticket_fields.push(campo_de_ticket)
        }
        json.data.formularios.push({
            if_form: form.id,
            nombre_form: form.raw_name,
            ticket_fields: ticket_fields
        })
    }

}

const Tyler = async () => {
    let forms = await client.request("/api/v2/ticket_forms.json")
    forms = forms.ticket_forms
    let ticket_fields = await client.request("/api/v2/ticket_fields.json")
    ticket_fields = ticket_fields.ticket_fields
    let id, custom_field, form
    let campo = {}
    let campos = []
    let desplegable_opciones = []
    let desplegable_arreglo = []
    let desplegable_opcion = {}
    for (let i = 0; i < forms.length; i++) {
        campos = []
        form = forms[i]
        let { ticket_field_ids } = form
        for (let j = 0; j < ticket_field_ids.length; j++) {
            campo = {}
            desplegable_arreglo = []
            id = ticket_field_ids[j]
            custom_field = ticket_fields.find(custom_field => custom_field.id == id)
            campo.id_campo = custom_field.id
            campo.nombre_campo = custom_field.raw_title
            campo.tipo = custom_field.type
            if (custom_field.type == "tagger") {
                desplegable_opciones = custom_field.custom_field_options
                for (let k = 0; k < desplegable_opciones.length; k++) {
                    desplegable_opcion = {}
                    desplegable_opcion.id_opcion = desplegable_opciones[k].id
                    desplegable_opcion.etiqueta_opcion = desplegable_opciones[k].raw_name
                    desplegable_opcion.valor_opcion = desplegable_opciones[k].value
                    desplegable_arreglo.push(desplegable_opcion)
                }
                campo.desplegable = desplegable_arreglo
            } else {
                campo.desplegable = []
            }
            campos.push(campo)


        }

        console.log("campos", campos);
        json.data.formularios.push({
            id_form: form.id,
            nombre_form: form.raw_name,
            ticket_fields: campos
        })

    }



}




//llenarData()
Tyler();


let json = {
    data: {
        formularios: [
            {
                id_form: 0,
                nombre_form: "",
                ticket_fields: [
                    {
                        id_campo: 0,
                        nombre_campo: "",
                        tipo: "",
                        desplegable: [
                            {
                                id_opcion: 0,
                                etiqueta_opcion: "",
                                valor_opcion: ""
                            }
                        ]
                    }
                ]
            }
        ]
    }

}


setTimeout(() => { console.log("datos", JSON.stringify(json)); }, 10000)