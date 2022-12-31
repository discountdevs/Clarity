var WorkshopUI = function (workshop_instance) {
  this.workshop = workshop_instance;

  window.loadlvl = function (level) {
    this.workshop.get_level(function (data) {
      game.log("Loading level " + level);
      window.map = {};
      var jsonMap = JSONfn.parse(data);
      for (var key in jsonMap) {
        window.map[key] = jsonMap[key];
      }
      game.load_map(window.map);
    }, level);
  }

  var self = this;
  window.showLvlPage = function (level) {
    self.show_level(level);
  }
}

WorkshopUI.prototype.show_level_list = function () {
  var self = this;
  // Show a loading screen
  Swal.fire({
    title: 'Please wait...',
    didOpen: () => {
      Swal.showLoading();
    },
    onAfterClose: () => {
      Swal.hideLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false
  });
  
  self.workshop.list_all_levels(function (data) {
    Swal.close();
    var level_list = JSON.parse(data);
    var level_list_html = "";
    for (var i = 0; i < level_list.length; i++) {
      level_list_html += "<li><a href='#' onclick='window.showLvlPage("+ level_list[i].id +");' id='level_" + level_list[i].id + "'>" + level_list[i].name + "</a></li>";
    }

    Swal.fire({
      title: "Select a level",
      html: "<ul>" + level_list_html + "</ul>",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      didOpen: function () {
        for (var i = 0; i < level_list.length; i++) {
          $("#level_" + level_list[i].id).click(function (e) {
            e.preventDefault();
            self.show_level($(this).attr("id").split("_")[1]);
          });
        }
      }
    });

  });
}

WorkshopUI.prototype.show_level = function (level_id) {
  var self = this;
  // Show a loading screen
  Swal.fire({
    title: 'Please wait...',
    didOpen: () => {
      Swal.showLoading();
    },
    onAfterClose: () => {
      Swal.hideLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false
  });
  
  self.workshop.get_level_meta(function (data) {
    Swal.close();


    Swal.fire({
      title: data.name,
      html: `
      <p style="color: white;">Author: ${data.author}</p>
      <p style="color: white;">Level ID: ${data.id}</p>
      `,
      showCancelButton: true,
      cancelButtonText: "Back",
      showConfirmButton: true,
      confirmButtonText: "Load Level",
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.loadlvl(level_id);
      }
    });

  }, level_id);
}