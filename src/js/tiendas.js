import { html, render } from "lit/html.js";
import { Stores, Store, log } from "./stores";
(async (document, $, storesJsonFile) => {

	function cityButton(label = "", city = "") {
		return html`<li role="presentation">
			<a href="#${label}" aria-controls="${label}" role="tab" data-toggle="tab">${city}</a>
		</li>`;
	}

	async function addNiceSelect() {
		const s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "https://cdn.jsdelivr.net/gh/ux-alkosto/stores/dist/common/js/jquery.nice-select.js";
		s.crossorigin = "anonymus";
		document.getElementsByTagName("head")[0].appendChild(s);
	}

	try {
		const Tiendas = new Stores(storesJsonFile),
			desktopMenu = document.querySelector(".cities-menu"),
			mobileMenu = document.querySelector(".cities-menu--mobile"),
			storesContainer = document.querySelector("#stores"),
			isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

		if (isMobile) addNiceSelect();

		await Tiendas.stores.then(async({ ciudades }) => {
			storesContainer.innerHTML = "";
			const citiesItems = [];
			const buttonsItems = [];

			Object.entries(ciudades).map(([label, city] = ciudades) => {
				buttonsItems.push(cityButton(label, city.label));
				const option = new Option(city.label, label);
				mobileMenu.append(option);

				Object.values(city.tiendas).map(async store => {
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
			});

			render(buttonsItems, desktopMenu);
			Promise.all(citiesItems).then(item => render(item, storesContainer));

			desktopMenu.querySelectorAll("li > a").forEach(menu => {
				menu.addEventListener("click", e => {
					e.preventDefault();
					document.querySelector(".cities-menu > li.active").classList.remove("active");
					e.currentTarget.closest("li").classList.add("active");
					const optionValue = menu.getAttribute("href").replace("#", "");
					if (optionValue) {
						document.querySelectorAll(`.store:not([data-city~=${optionValue}])`).forEach(storeElement => storeElement.style.display = "none");
						document.querySelectorAll(`.store[data-city~=${optionValue}]`).forEach(storeElement => storeElement.style.display = "grid");
					} else {
						document.querySelectorAll(".store").forEach(storeElement => storeElement.style.display = "none");
					}
				});
			});

			if (isMobile) {
				$("document").ready(function () {
					$(mobileMenu).niceSelect().change(function () {
						$(this).find("option:selected").each(function () {
							const optionValue = $(this).attr("value");
							if (optionValue) {
								$(".store").not("[data-city~=" + optionValue + "]").hide();
								$("[data-city~=" + optionValue + "]").css({ "display": "grid" });
							} else {
								$(".store").hide();
							}
						});
					});
				});
			}
		});
	} catch (error) {
		log(error, "error");
	}

	// eslint-disable-next-line no-undef
})(document, window.jQuery, storesJsonFile);