var popups = require("./popup");

var Marker = L.Marker.extend({
    options: {
        elevation: 0
    },

    getElevation: function() {
        return this.options.elevation;
    },

    setElevation: function(elevation) {
        this.options.elevation = elevation;
        return this;
    },

    update: function() {
        if (this._icon) {
            var screenPos = this._map.getScreenPositionOfLayer(this);
            this._setPos(screenPos.round());
        }
        return this;
    },

    bindPopup: function(content, options) {
        var popup = content;
        if (!(popup instanceof L.Popup)) {
            if (!options) {
                options = {};
            }
            if (!("elevation" in options)) {
                options["elevation"] = this.getElevation();
            }
            popup = new popups.Popup(options, this).setContent(content);
        }
        return L.Marker.prototype.bindPopup.call(this, popup, options);
    }
});

var marker = function(latLng, options) {
    return new Marker(latLng, options);
};

module.exports = {
    Marker: Marker,
    marker: marker
};