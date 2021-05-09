import { render } from "lit/html.js";
import { Stores, Store, log } from "./stores";
(async (document, storesJsonFile) => {
	try {
		const Tiendas = new Stores(storesJsonFile),
			params = Stores.getStoreFromUrl(),
			storesContainer = document.querySelector("#stores"),
			cityLabel = document.querySelectorAll(".nombre-ciudad");

		log(params);

		await Tiendas.stores.then(({ ciudades }) => {
			storesContainer.innerHTML = "";
			const city = ciudades[params.city], label = ciudades[params.city][0];
			const citiesItems = [];

			if (Object.keys(ciudades[params.city].tiendas).length) {
				if (cityLabel.length) {
					cityLabel.forEach(label => label.innerHTML = city.label);
				}
				Object.values(city.tiendas).map(store => {
					const Tienda = new Store({
						address: store.direccion,
						city: city.label,
						howToGet: store.como_llegar,
						label: label,
						link: store.ir,
						external: store.externo,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					});
					citiesItems.push(Tienda.render());
				});
				Promise.all(citiesItems).then(item => render(item, storesContainer));
			}
		});
	} catch (error) {
		log(error, "error");
	}
	// eslint-disable-next-line no-undef
})(document, storesJsonFile);