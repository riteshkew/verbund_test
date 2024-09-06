export default {
	myVar1: [],
	myVar2: {},
	async execute() {
		try {
			await SQLHelper.cacheUser();
			showAlert('E-Mail erfolgreich gesendet', 'success');
			closeModal(Modal1.name);
			await SendEmail.run();
			showAlert('E-Mail erfolgreich gesendet', 'success');
		} catch (error) {
				showAlert(`Fehler: ${error} \n kontaktieren Sie Administrator unter hynek.zemanec@verbund.com`, 'error');
		}
	}
}