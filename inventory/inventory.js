(function() {
  inventory = {
    retrieveTemplate: function() { return $("#inventory_item").text(); },
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
    bindEvents: function() {
      $("button").on("click", this.createItem.bind(this));
      $("#item_table").on("blur", "input", this.saveData.bind(this));
    },
    createItem: function(e) {
      e.preventDefault();
      var custom_template = this.i_templ.replace(/ID/g, this.id_num);
      $("#item_table").append(custom_template).on("click", "a", this.deleteItem.bind(this));
      this.saveItem(e.target);
    },
    deleteItem: function(e) {
      e.preventDefault();
      this.findItem(e.target).
      $(this).closest("tr").prev().andSelf().remove();
      this.items = this.items.find(function(item) {
        return this.findItemId(target) !== item.id;
      }, this);
    },
    saveItem: function() {
      this.items.push({
        id: this.id_num
      });
      this.id_num ++;
    },
    saveData: function(e) {
      var item = this.findItem(e.target);
      item[e.target.name] = $(e.target).val();
    },
    findItemId: function(item) {
      return +/\d+/.exec($(item).attr("id"))[0];
    },
    findItem: function(target) {
      return this.items.find(function(item) {
        return this.findItemId(target) === item.id;
      }, this);
    }
  };
})();

$(function() { inventory.init(); })


