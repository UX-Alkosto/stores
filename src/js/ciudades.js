import { Stores, Store, log } from "./stores/index.js";
(async (document, storesJsonFile) => {
	try {
		const Tiendas = new Stores(storesJsonFile),
			params = Stores.getStoreFromUrl(),
			storesContainer = document.querySelector("#stores"),
			cityLabel = document.querySelectorAll(".nombre-ciudad");

		log(params);

		await Tiendas.stores.then(({ ciudades }) => {
			storesContainer.innerHTML = "";
			let index = 0;
			const city = ciudades[params.city], label = ciudades[params.city][0];

			if (Object.keys(ciudades[params.city].tiendas).length) {
				if (cityLabel.length) {
					cityLabel.forEach(label => label.innerHTML = city.label);
				}
				Object.values(city.tiendas).map(async store => {
					const Tienda = new Store({
						address: store.direccion,
						city: city.label,
						howToGet: store.como_llegar,
						order: index,
						label: label,
						link: store.ir,
						external: store.externo,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					});
					index++;
					storesContainer.append(document.createRange().createContextualFragment(await Tienda.render()));
				});
			}
		});
	} catch (error) {
		log(error, "error");
	}
	// eslint-disable-next-line no-undef
})(document, storesJsonFile);