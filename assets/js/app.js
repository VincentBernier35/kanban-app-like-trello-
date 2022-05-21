var app = {
  base_url: "http://localhost:5001/api",
  init: function () {
    console.log("Hello this app is running from app.init!");

    // configuration of the urls of all the modules of this app
    cardModule.setBaseUrl(app.base_url);
    listModule.setBaseUrl(app.base_url);
    toolsModule.setBaseUrl(app.base_url);
    tagModule.setBaseUrl(app.base_url);
    console.log("Hello from set base url");

    app.addListenersToActions();
    console.log("hello from method app.addListenersToActions");

    app.loadData();
    console.log("hello from method app.loadData");
  },
  // this method is used to load data from database
  loadData: async () => {
    try {
      let res = await fetch(`${app.base_url}/lists`);

      if(res.status !== 200) {
        let error = await res.json();
        throw error;
      } else {
        let lists = await res.json();

        for (const list of lists) {
          listModule.makeDOMObject(list);

          for (const card of list.cards) {
            cardModule.makeDOMObject(card);

            for (const tag of card.tags) {
              tag.module.makeDOMObject(tag);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  

};


// when the document is loaded, execute app.init !
document.addEventListener("DOMContentLoaded", app.init);


