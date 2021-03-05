import { Stores, Store, log } from "./stores/index.js";
(async (document, storesJsonFile) => {
	try {
		const Tiendas = new Stores(storesJsonFile),
			params = Stores.getStoreFromUrl(),
			storesContainer = document.querySelector("#stores"),
			storeDetails = document.querySelector(".contenedor_tienda_detalle"),
			cityLabel = document.querySelectorAll(".nombre-ciudad"),
			otherStores = document.querySelector(".tit_otras");

		log(params);

		await Tiendas.stores.then(async ({ ciudades }) => {
			const store = ciudades[params.city].tiendas[params.store];

			storesContainer.innerHTML = "";
			cityLabel.forEach(label => label.innerHTML = ciudades[params.city].label);
			const Tienda = new Store({
				address: store.direccion,
				external: store.externo,
				howToGet: store.como_llegar,
				image: store.imagen,
				link: store.ir,
				map: store.ver_mapa,
				name: store.nombre_tienda,
				schedule: store.horario_apertura,
				scheduleDetail: store.horarios
			});

			storeDetails.append(document.createRange().createContextualFragment(await Tienda.render("detail")));

			if (Object.keys(ciudades[params.city].tiendas).length > 1) {
				// eslint-disable-next-line no-undef
				Object.entries(ciudades[params.city].tiendas).map(async ([label, store] = tiendas) => {
					if (label == params.store) return;

					const Tienda = new Store({
						address: store.direccion,
						city: ciudades[params.city].label,
						howToGet: store.como_llegar,
						label: label,
						link: store.ir,
						external: store.externo,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					});
					storesContainer.append(document.createRange().createContextualFragment(await Tienda.render()));
				});
			} else {
				otherStores.remove();
			}
		});
	} catch (error) {
		log(error, "error");
	}
	// eslint-disable-next-line no-undef
})(document, storesJsonFile);