const sql = require("./db.js");

const permissionCategories = [
  "permadminglob",
  "permadminprofil",
  "permadminuser",
  "permageneven",
  "permagenmeet",
  "permcamp",
  "permcampobj",
  "permcartodoc",
  "permcartorisq",
  "permcomuart",
  "permcomudoc",
  "permcomusond",
  "permctraudit",
  "permdemdiv",
  "permdemincid",
  "permdispoctr",
  "permdocliv",
  "permrefaction",
  "permrefaudit",
  "permrefnorme",
  "permrefrisq",
];

const permissionTypes = [
  "permcreate",
  "permedit",
  "permdelete",
  "permcontrol",
  "permvalidate",
  "permcancel",
];

const Me = function (right) {
  this.permadminglob = right.permadminglob;
  this.permadminprofil = right.permadminprofil;
  this.permadminuser = right.permadminuser;
  this.permageneven = right.permageneven;
  this.permagenmeet = right.permagenmeet;
  this.permcamp = right.permcamp;
  this.permcampobj = right.permcampobj;
  this.permcartodoc = right.permcartodoc;
  this.permcartorisq = right.permcartorisq;
  this.permcomuart = right.permcomuart;
  this.permcomudoc = right.permcomudoc;
  this.permcomusond = right.permcomusond;
  this.permctraudit = right.permctraudit;
  this.permdemdiv = right.permdemdiv;
  this.permdemincid = right.permdemincid;
  this.permdispoctr = right.permdispoctr;
  this.permdocliv = right.permdocliv;
  this.permrefaction = right.permrefaction;
  this.permrefaudit = right.permrefaudit;
  this.permrefnorme = right.permrefnorme;
  this.permrefrisq = right.permrefrisq;
};

Me.findRightById = (id, result) => {
  const generatePermissionQuery = (category) => {
    return permissionTypes
      .map((type) => `${category}.${type} AS ${category}_${type}`)
      .join(", ");
  };

  let query = `
      SELECT adminprofil.*, 
        ${permissionCategories.map(generatePermissionQuery).join(",\n    ")}
      FROM adminprofil
        ${permissionCategories
          .map(
            (category) =>
              `JOIN ${category} ON adminprofil.id = ${category}.profile_id`
          )
          .join("\n    ")}
      WHERE adminprofil.id = ${id}
    `;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length === 0) {
      // Profile with the provided id was not found
      result("Right not found", null);
      return;
    }

    const formatPermissions = (row, category) => {
      const permissions = {
        permcreate: row[`${category}_permcreate`],
        permedit: row[`${category}_permedit`],
        permdelete: row[`${category}_permdelete`],
        permcontrol: row[`${category}_permcontrol`],
        permvalidate: row[`${category}_permvalidate`],
        permcancel: row[`${category}_permcancel`],
      };

      // Vérifie si toutes les valeurs sont 0
      if (Object.values(permissions).every((value) => value === 0)) {
        return false;
      }

      return permissions;
    };

    const formattedData = res.map((row) => ({
      permadminglob: formatPermissions(row, "permadminglob"),
      permadminprofil: formatPermissions(row, "permadminprofil"),
      permadminuser: formatPermissions(row, "permadminuser"),
      permageneven: formatPermissions(row, "permageneven"),
      permagenmeet: formatPermissions(row, "permagenmeet"),
      permcamp: formatPermissions(row, "permcamp"),
      permcampobj: formatPermissions(row, "permcampobj"),
      permcartodoc: formatPermissions(row, "permcartodoc"),
      permcartorisq: formatPermissions(row, "permcartorisq"),
      permcomuart: formatPermissions(row, "permcomuart"),
      permcomudoc: formatPermissions(row, "permcomudoc"),
      permcomusond: formatPermissions(row, "permcomusond"),
      permctraudit: formatPermissions(row, "permctraudit"),
      permdemdiv: formatPermissions(row, "permdemdiv"),
      permdemincid: formatPermissions(row, "permdemincid"),
      permdispoctr: formatPermissions(row, "permdispoctr"),
      permdocliv: formatPermissions(row, "permdocliv"),
      permrefaction: formatPermissions(row, "permrefaction"),
      permrefaudit: formatPermissions(row, "permrefaudit"),
      permrefnorme: formatPermissions(row, "permrefnorme"),
      permrefrisq: formatPermissions(row, "permrefrisq"),
    }));

    console.log("formattedData: ", formattedData);
    result(null, formattedData[0]); // Assuming the `id` is unique, returning only the first element of the array.
  });
};

module.exports = Me;
