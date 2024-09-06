export default {
	rejectionReasons: [],
	
	resetReasons(){
		this.rejectionReasons = []
	},

	addRejectionReason(reason){
		if(this.rejectionReasons.find(el => el === reason)){
			return
		}
		this.rejectionReasons.push(reason)
		return
	},

	removeRejectionReason(reason){
		let processed = this.rejectionReasons.filter((el) => el !== reason)
		this.rejectionReasons = processed
	},
	
	checkPLZ(){
		let rejectionReason = `Keinen Partner für ${appsmith.store.currentCustomer.PLZ !== undefined ? appsmith.store.currentCustomer.PLZ: appsmith.store.currentCustomer.Postleitzahl}`
		if(getPartner.data.length === 0){
				this.addRejectionReason(rejectionReason)
				showAlert(`Kunde ist nicht geeignet: ${rejectionReason}`,"error")
				return false
		}
		return true
	},

	checkRealityType(realityType){
		let rejectionReason = "Immobilienart: Wohnung/Mehrparteienhaus"
		if(realityType === "Wohnung/Mehrparteienhaus" ){
			this.addRejectionReason(rejectionReason)
			showAlert(`Kunde ist nicht geeignet: ${rejectionReason}`,"error")
			return false
		}
		this.removeRejectionReason(rejectionReason)

		rejectionReason = "Immobilienart: Sonstiges" 
		if(realityType === "Sonstiges" ){
			this.addRejectionReason(rejectionReason)
			showAlert(`Kunde ungültig: ${rejectionReason}`,"error")
			return false
		}
		this.removeRejectionReason(rejectionReason)

		return true
	},

	checkHeatingCircuits(heatingCircuitsNum){
		let rejectionReason = "Heizkreise > 2"
		if(heatingCircuitsNum > 2 ){
			this.addRejectionReason(rejectionReason)
			showAlert(`Kunde ungültig: ${rejectionReason}`,"error")
			return false
		}
		this.removeRejectionReason(rejectionReason)
		return true
	},

	// 55 inklusive oder exklusive
	checkTemperature(temperatureInC){
		let rejectionReason = "Temperatur übersteigt 55 Grad"
		if(temperatureInC > 55){
			this.addRejectionReason(rejectionReason)
			showAlert(`Kunde ungültig: ${rejectionReason}`,"error")
			return false
		}
		this.removeRejectionReason(rejectionReason)
		return true
	},
	
	checkComputedValues(averageKWh, Heizlastwert){
		if(this.rejectionReasons.length !== 0){
			return false
		}
		if(averageKWh > 30000){
			return false
		}
		if(Heizlastwert > 150){
			return false
		}
		return true
	}


}