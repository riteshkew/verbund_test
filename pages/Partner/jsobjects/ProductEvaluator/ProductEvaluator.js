export default {
	model:null,
	waterModel: null,
	partner: null,
	evaluateWPProduct() {
    let model = null;

    const customer = appsmith.store.currentCustomer;
    const integriert = customer.WarmwasserspeicherMitWaermepumpeIntegriert;
    const energie = customer.DurchschnittsenergieKWh;

    switch (integriert) {
        case "J":
            model = "Vitocal 252-A";
            break;
        case "N":
            model = "Vitocal 250-A";
            break;
        default:
            break;
    }
		
		if(customer.vorhandeneWarmwasserbereitungBleiben === "J"){
			model = "Vitocal 250-A"
		}

    if (customer.Heizkreise === 1 || customer.Heizkreise === 2) {
        model += ` ${customer.Heizkreise}C`;
    }

    if (energie < 8000) {
        model += ", 4kW";
    } else if (energie < 15000) {
        model += ", 8kW";
    } else if (energie < 22000) {
        model += ", 10kW";
    } else if (energie < 30000) {
        model += ", 13kW";
    }

    this.model = model;
    return model;
},
	
	evaluateWarmwasserProdukt(){
		let model = null
		
		if(appsmith.store.currentCustomer.Warmwasserbereitung === "Brauchwasserwärmepumpe"){
			return model
		}
		
		if(appsmith.store.currentCustomer.WarmwasserspeicherWuenschgroesse === 300){
			model = "HPA Speicher 300l"
		}
		
		if(appsmith.store.currentCustomer.WarmwasserspeicherWuenschgroesse === 500){
			model = "Wärmepumpe Solarspeicher 500l"
		}
		
		if(appsmith.store.currentCustomer.Solarthermieanlage === "J"){
			model = "Wärmepumpe Solarspeicher 500l"
		}
		this.waterModel = model
		return model
	},
	
	buildWPQuery(){
		let product =  this.model
		
		if(product === null){
			product = this.evaluateWPProduct()
		}
		
		if(product !== null){
			return `p.produkt = '${product}' AND pa.Partner = '${getPartner.data[0].Partner}'`
		}
		
		return '1 = 2'
	},
	
	buildWSQuery(){
		let product =  this.waterModel
		
		if(product === null){
			product = this.evaluateWarmwasserProdukt()
		}
		
		if(product !== null){
			return `( p.produkt = '${product}' AND pa.Partner = '${getPartner.data[0].Partner}' )`
		}
		return '1 = 2'
	},
	
	evaluateProducts(){
		this.evaluateWPProduct()
		this.evaluateWarmwasserProdukt()
		return 
	},
	
	async getData(){
		this.evaluateProducts();
		
		let partner = await getPartner.run()
		this.partner = partner[0].Partner
		await get_WP_data.run()
		await get_WS_data.run()
		EmailEvaluator.evaluateEmail()
		
		return 
	}
	
}