(function() {
  inventory = {
    id_num: 1,
    items: [],
    init: function() {
      this.setDate();
      this.i_templ = this.retrieveTemplate();
      this.bindEvents();
    },
    setDate: function() {
      var time = new Date();

      $("p").text(time.toGMTString());
    },
    retrieveTemplate: function() {
      return $("#inventory_item").text();
    },
    bindEvents: function() {
      $("button").on("click", this.createItem.bind(this));
      $("#item_table").on("blur", "input", this.saveItemInfo.bind(this));
      $("#item_table").on("click", "a", this.deleteItem.bind(this));
    },
    createItem: function(e) {
      e.preventDefault();
      var item_template = this.i_templ.replace(/ID/g, this.id_num);

      $("#item_table").append(item_template)
      this.saveItem(e.target);
    },
    saveItem: function() {
      this.items.push({ id: this.id_num });
      this.id_num ++;
    },
    saveItemInfo: function(e) {
      var item = this.findItem(e.target);

      item[e.target.name] = $(e.target).val();
    },
    deleteItem: function(e) {
      e.preventDefault();

      this.findItem(e.target);
      $(e.target).closest("tr").prev().andSelf().remove();
      var idx = this.items.indexOf(this.findItem(e.target));
      if (idx !== undefined) {
        this.items.splice(idx, 1);
      }
    },
    findItem: function(target) {
      return this.items.find(function(item) {
        return this.findItemId(target) === item.id;
      }, this);
    },
    findItemId: function(target) {
      return +/\d+/.exec($(target).attr("id"))[0];
    }
  };
})();

$(function() { inventory.init(); })


