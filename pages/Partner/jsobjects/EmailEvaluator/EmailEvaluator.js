export default {
	partnerEmail: null,
	partners:{
		TUERKOTT: "Tuerkott",
		HOCHRIEDER: "Hochrieder",
		BIEDERMANN: "Biedermann",
		GAHLEITNER: "Gahleitner",
		MACH : "Mach"
		
	},
	partnerEmails:{
		TUERKOTT: "waermepumpe@tmt-group.at",
		HOCHRIEDER: "j.freitag@hochrieder.at",
		BIEDERMANN: "martin@biedermann.co.at",
		GAHLEITNER: "waermepumpe@gahleitner.com",
		MACH : "office@mach-gmbh.at"
	},
	evaluateEmail(){
		if(getPartner.data[0].Email !== undefined){
			this.partnerEmail = getPartner.data[0].Email
			return 
		}
		
		if(getPartner.data[0].Partner === this.partners.TUERKOTT){
			// TODO uncomment when life
			// this.partnerEmail = "hynek.zemanec@verbund.com"
			this.partnerEmail = this.partnerEmails.TUERKOTT
			return
		}
		if(getPartner.data[0].Partner === this.partners.HOCHRIEDER){
			// TODO uncomment when life
			// this.partnerEmail = "hynek.zemanec@verbund.com"
			this.partnerEmail = this.partnerEmails.HOCHRIEDER
			return
		}
		if(getPartner.data[0].Partner === this.partners.BIEDERMANN){
			// TODO uncomment when life
			// this.partnerEmail = "hynek.zemanec@verbund.com"
			this.partnerEmail = this.partnerEmails.BIEDERMANN
			return
		}
		if(getPartner.data[0].Partner === this.partners.GAHLEITNER){
			// TODO uncomment when life
			// this.partnerEmail = "hynek.zemanec@verbund.com"
			this.partnerEmail = this.partnerEmails.GAHLEITNER
			return
		}
		if(getPartner.data[0].Partner === this.partners.MACH){
			// TODO uncomment when life
			// this.partnerEmail = "hynek.zemanec@verbund.com"
			this.partnerEmail = this.partnerEmails.MACH
			return
		}
		showAlert(`No Partner for ${appsmith.store.currentCustomer.PLZ}`, "Error")
		return
	},
	async sendEmailToPartner(){
		await sendToPartner.run()
	}
}