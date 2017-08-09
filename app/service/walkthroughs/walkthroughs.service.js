"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var globals_1 = require("../../globals/globals");
var WalkthroughsService = (function () {
    function WalkthroughsService(http) {
        this.http = http;
    }
    WalkthroughsService.prototype.get = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = globals_1.GlobalSettings.apiUrl + "walkthroughs";
        var options = new http_1.RequestOptions({ headers: headers });
        var body = '';
        return this.http.post(url, body, options)
            .map(function (res) { return res.json(); });
    };
    return WalkthroughsService;
}());
WalkthroughsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WalkthroughsService);
exports.WalkthroughsService = WalkthroughsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fsa3Rocm91Z2hzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YWxrdGhyb3VnaHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBdUU7QUFFdkUsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUUvQixpREFBdUQ7QUFHdkQsSUFBYSxtQkFBbUI7SUFDOUIsNkJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBRTlCLENBQUM7SUFFRCxpQ0FBRyxHQUFIO1FBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUMsbUNBQW1DLEVBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksR0FBRyxHQUFHLHdCQUFjLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7YUFDOUIsR0FBRyxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksbUJBQW1CO0lBRC9CLGlCQUFVLEVBQUU7cUNBRWUsV0FBSTtHQURuQixtQkFBbUIsQ0FhL0I7QUFiWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQgeyBHbG9iYWxTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2dsb2JhbHMvZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXYWxrdGhyb3VnaHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XG5cbiAgfVxuXG4gIGdldCgpIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30pO1xuICAgIGxldCB1cmwgPSBHbG9iYWxTZXR0aW5ncy5hcGlVcmwgKyBcIndhbGt0aHJvdWdoc1wiO1xuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzOiBoZWFkZXJzfSk7XG4gICAgbGV0IGJvZHkgPSAnJztcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiByZXMuanNvbigpKTtcbiAgfVxufVxuIl19