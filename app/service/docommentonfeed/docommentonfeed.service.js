"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var globals_1 = require("../../globals/globals");
var DoCommentFeedService = (function () {
    function DoCommentFeedService(http) {
        this.http = http;
    }
    DoCommentFeedService.prototype.docomment = function (str_token, feed_id, str_comment) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = globals_1.GlobalSettings.apiUrl + "docommentonfeed";
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "efns_token=" + str_token + "&efns_feed_id=" + feed_id + "&efns_cmnts=" + str_comment;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res.json(); });
    };
    return DoCommentFeedService;
}());
DoCommentFeedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DoCommentFeedService);
exports.DoCommentFeedService = DoCommentFeedService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jb21tZW50b25mZWVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2NvbW1lbnRvbmZlZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBdUU7QUFFdkUsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUUvQixpREFBdUQ7QUFHdkQsSUFBYSxvQkFBb0I7SUFDL0IsOEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBRTlCLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsV0FBbUI7UUFDL0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUMsbUNBQW1DLEVBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksR0FBRyxHQUFHLHdCQUFjLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BELElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxHQUFHLGFBQWEsR0FBRyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsT0FBTyxHQUFHLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDakcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7YUFDOUIsR0FBRyxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksb0JBQW9CO0lBRGhDLGlCQUFVLEVBQUU7cUNBRWUsV0FBSTtHQURuQixvQkFBb0IsQ0FjaEM7QUFkWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQgeyBHbG9iYWxTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2dsb2JhbHMvZ2xvYmFscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb0NvbW1lbnRGZWVkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xuXG4gIH1cblxuICBkb2NvbW1lbnQoc3RyX3Rva2VuOiBzdHJpbmcsIGZlZWRfaWQ6IG51bWJlciwgc3RyX2NvbW1lbnQ6IHN0cmluZykge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSk7XG4gICAgbGV0IHVybCA9IEdsb2JhbFNldHRpbmdzLmFwaVVybCArIFwiZG9jb21tZW50b25mZWVkXCI7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICBsZXQgYm9keSA9IFwiZWZuc190b2tlbj1cIiArIHN0cl90b2tlbiArIFwiJmVmbnNfZmVlZF9pZD1cIiArIGZlZWRfaWQgKyBcIiZlZm5zX2NtbnRzPVwiICsgc3RyX2NvbW1lbnQ7XG4gICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSk7XG4gIH1cbn1cbiJdfQ==