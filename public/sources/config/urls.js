const mainUrl = "http://localhost:3000/api/v1/";

export const urls = {
	status: `${mainUrl}login/status`,
	login: `${mainUrl}login/login`,
	logout: `${mainUrl}login/logout`,
	register: `${mainUrl}login/register`,
	clients: `${mainUrl}clients/`,
	declineReasons: `${mainUrl}declineReasons/`,
	deliveryTypes: `${mainUrl}deliveryTypes/`,
	orders: `${mainUrl}orders/`,
	paymentTypes: `${mainUrl}paymentTypes`,
	phoneModels: `${mainUrl}phoneModels`,
	phones: `${mainUrl}phones`,
	statuses: `${mainUrl}statuses`,
	statusReasons: `${mainUrl}statusReasons`
};
