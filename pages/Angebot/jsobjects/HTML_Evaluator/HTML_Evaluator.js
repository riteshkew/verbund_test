export default {
	template:null,
	templates:{
		NO_PARTNER: "NO_PARTNER",
		WITH_WS: "WITH_WS",
		WP_ONLY: "WP_ONLY",
		NOT_ELIGIBLE: "NOT_ELIGIBLE"
	},
	evaluateTemplate(){

		if(getPartner.data.length === 0){
			return this.template = this.templates.NO_PARTNER
		}

		if(appsmith.store.currentCustomer.Anspruch === "J"){

			if(appsmith.store.currentCustomer.WarmwasserspeicherMitWaermepumpeIntegriert === "N"){
				return  this.template =  this.templates.WITH_WS
			}

			return  this.template = this.templates.WP_ONLY
		}

		return this.template = this.templates.NOT_ELIGIBLE

	},
	async sendAngebot(){
		if(HTML_Evaluator.template === HTML_Evaluator.templates.WP_ONLY){
			// WP Only
			AngebotWPOnly.run().then(() => {
				showAlert('E-Mail gesendet', 'success');
				updateProspect.run().then(() => {
					navigateTo('Home', {}, 'SAME_WINDOW');
				});
			}).catch(() => {
				showAlert('Fehler mit Datenbankanfrage', 'error');
			});
			return
		}
		AngebotWithWS.run().then(() => {
			showAlert('E-Mail gesendet', 'success');
			updateProspect.run().then(() => {
				navigateTo('Home', {}, 'SAME_WINDOW');
			});
		}).catch(() => {
			showAlert('Fehler mit Datenbankanfrage', 'error');
		});
	}
}