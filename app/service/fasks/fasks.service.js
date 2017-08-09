"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var globals_1 = require("../../globals/globals");
var FasksService = (function () {
    function FasksService(http) {
        this.http = http;
    }
    FasksService.prototype.get = function (str_token, str_use, num_offset) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = globals_1.GlobalSettings.apiUrl + "getfaskforstar";
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "efns_token=" + str_token + "&use=" + str_use + "&efns_offset=" + num_offset;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res.json(); });
    };
    return FasksService;
}());
FasksService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FasksService);
exports.FasksService = FasksService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFza3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZhc2tzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXVFO0FBRXZFLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFFL0IsaURBQXVEO0FBR3ZELElBQWEsWUFBWTtJQUN2QixzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFFOUIsQ0FBQztJQUVELDBCQUFHLEdBQUgsVUFBSSxTQUFpQixFQUFFLE9BQWUsRUFBRSxVQUFrQjtRQUN4RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFDLGNBQWMsRUFBQyxtQ0FBbUMsRUFBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxHQUFHLEdBQUcsd0JBQWMsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxJQUFJLEdBQUcsYUFBYSxHQUFHLFNBQVMsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7YUFDOUIsR0FBRyxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksWUFBWTtJQUR4QixpQkFBVSxFQUFFO3FDQUVlLFdBQUk7R0FEbkIsWUFBWSxDQWN4QjtBQWRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmFza3NTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XG5cbiAgfVxuXG4gIGdldChzdHJfdG9rZW46IHN0cmluZywgc3RyX3VzZTogc3RyaW5nLCBudW1fb2Zmc2V0OiBudW1iZXIpIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30pO1xuICAgIGxldCB1cmwgPSBHbG9iYWxTZXR0aW5ncy5hcGlVcmwgKyBcImdldGZhc2tmb3JzdGFyXCI7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICBsZXQgYm9keSA9IFwiZWZuc190b2tlbj1cIiArIHN0cl90b2tlbiArIFwiJnVzZT1cIiArIHN0cl91c2UgKyBcIiZlZm5zX29mZnNldD1cIiArIG51bV9vZmZzZXQ7XG4gICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSk7XG4gIH1cbn1cbiJdfQ==