export default {
	transformedData: null,
	processData () {
		let data = JSONForm1.formData
		let createdOn = new Date().toISOString().replace('T', ' ').replace('Z', '');
		data['formular_id'] = "manual"
		data['beantragtAm'] = createdOn
	
		
		let processed = Object.fromEntries(Object.entries(data).filter(([_,val])=>(val !== null && val !== "" && _ !== 'id'  && val !== undefined)))
		this.transformedData = processed
		return processed
	}
}