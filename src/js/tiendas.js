"use strict";
import { Stores, Store, log } from "./stores/index.js";
(async (document, $, storesJsonFile) => {
	try {
		const Tiendas = new Stores(storesJsonFile),
			desktopMenu = document.querySelector(".cities-menu"),
			mobileMenu = document.querySelector(".cities-menu--mobile"),
			storesContainer = document.querySelector("#stores"),
			isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

		if (isMobile) await addNiceSelect();
		await Tiendas.stores.then(({ ciudades }) => {
			storesContainer.innerHTML = "";

			let index = 0;
			Object.entries(ciudades).map(([label, city] = ciudades) => {
				const button = document.createRange().createContextualFragment(cityButton(label, city.label));
				const option = new Option(city.label, label);
				desktopMenu.append(button);
				mobileMenu.append(option);

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
			});

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

	function cityButton(label = "", city = "") {
		return `<li role="presentation">
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
	// eslint-disable-next-line no-undef
})(document, window.jQuery, storesJsonFile);