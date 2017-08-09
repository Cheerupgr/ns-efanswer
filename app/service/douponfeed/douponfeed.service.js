"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var globals_1 = require("../../globals/globals");
var DouponFeedService = (function () {
    function DouponFeedService(http) {
        this.http = http;
    }
    DouponFeedService.prototype.doupon = function (str_token, feed_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = globals_1.GlobalSettings.apiUrl + "douponfeed";
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "efns_token=" + str_token + "&efns_feed_id=" + feed_id;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res.json(); });
    };
    return DouponFeedService;
}());
DouponFeedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DouponFeedService);
exports.DouponFeedService = DouponFeedService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91cG9uZmVlZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG91cG9uZmVlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF1RTtBQUV2RSxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLGlEQUF1RDtBQUd2RCxJQUFhLGlCQUFpQjtJQUM1QiwyQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFFOUIsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxTQUFpQixFQUFFLE9BQWU7UUFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUMsbUNBQW1DLEVBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksR0FBRyxHQUFHLHdCQUFjLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLElBQUksR0FBRyxhQUFhLEdBQUcsU0FBUyxHQUFHLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzthQUM5QixHQUFHLENBQUMsVUFBQyxHQUFhLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxpQkFBaUI7SUFEN0IsaUJBQVUsRUFBRTtxQ0FFZSxXQUFJO0dBRG5CLGlCQUFpQixDQWM3QjtBQWRZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cbmltcG9ydCB7IEdsb2JhbFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9nbG9iYWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvdXBvbkZlZWRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XG5cbiAgfVxuXG4gIGRvdXBvbihzdHJfdG9rZW46IHN0cmluZywgZmVlZF9pZDogbnVtYmVyKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9KTtcbiAgICBsZXQgdXJsID0gR2xvYmFsU2V0dGluZ3MuYXBpVXJsICsgXCJkb3Vwb25mZWVkXCI7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICBsZXQgYm9keSA9IFwiZWZuc190b2tlbj1cIiArIHN0cl90b2tlbiArIFwiJmVmbnNfZmVlZF9pZD1cIiArIGZlZWRfaWQ7XG4gICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSk7XG4gIH1cbn1cbiJdfQ==