"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var globals_1 = require("../../globals/globals");
var FanswerService = (function () {
    function FanswerService(http) {
        this.http = http;
    }
    FanswerService.prototype.dosubmit = function (str_token, str_id, feed_id, str_fanswer, audio_id, video_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url = globals_1.GlobalSettings.apiUrl + "dosubmitfanswer";
        var options = new http_1.RequestOptions({ headers: headers });
        // pass efns_token  | efns_str_id  (star_id) |  efns_fask_id (to define which fask  you reply)
        // | efns_fanswer_text | efns_audio  (file field) | efns_video (file field)
        var body = "efns_token=" + str_token + "&efns_str_id=" + str_id + "&efns_fask_id=" + feed_id + "&efns_fanswer_text=" + str_fanswer + "&efns_audio=" + audio_id + "&efns_video=" + video_id;
        console.log(body);
        return this.http.post(url, body, options)
            .map(function (res) { return res.json(); });
    };
    return FanswerService;
}());
FanswerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FanswerService);
exports.FanswerService = FanswerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFuc3dlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFuc3dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF1RTtBQUV2RSxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLGlEQUF1RDtBQUd2RCxJQUFhLGNBQWM7SUFDekIsd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBRTlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLFdBQW1CLEVBQzlFLFFBQWdCLEVBQUUsUUFBZ0I7UUFDbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUMsbUNBQW1DLEVBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksR0FBRyxHQUFHLHdCQUFjLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1FBQ3BELElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELDhGQUE4RjtRQUM5RiwyRUFBMkU7UUFDM0UsSUFBSSxJQUFJLEdBQUcsYUFBYSxHQUFHLFNBQVMsR0FBRyxlQUFlLEdBQUcsTUFBTSxHQUFHLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxxQkFBcUIsR0FBRyxXQUFXLEdBQUcsY0FBYyxHQUFHLFFBQVEsR0FBRyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQzNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQzlCLEdBQUcsQ0FBQyxVQUFDLEdBQWEsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FFZSxXQUFJO0dBRG5CLGNBQWMsQ0FpQjFCO0FBakJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmFuc3dlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcblxuICB9XG5cbiAgZG9zdWJtaXQoc3RyX3Rva2VuOiBzdHJpbmcsIHN0cl9pZDogc3RyaW5nLCBmZWVkX2lkOiBzdHJpbmcsIHN0cl9mYW5zd2VyOiBzdHJpbmcsXG4gICAgYXVkaW9faWQ6IHN0cmluZywgdmlkZW9faWQ6IHN0cmluZykge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSk7XG4gICAgbGV0IHVybCA9IEdsb2JhbFNldHRpbmdzLmFwaVVybCArIFwiZG9zdWJtaXRmYW5zd2VyXCI7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICAvLyBwYXNzIGVmbnNfdG9rZW4gIHwgZWZuc19zdHJfaWQgIChzdGFyX2lkKSB8ICBlZm5zX2Zhc2tfaWQgKHRvIGRlZmluZSB3aGljaCBmYXNrICB5b3UgcmVwbHkpXG4gICAgLy8gfCBlZm5zX2ZhbnN3ZXJfdGV4dCB8IGVmbnNfYXVkaW8gIChmaWxlIGZpZWxkKSB8IGVmbnNfdmlkZW8gKGZpbGUgZmllbGQpXG4gICAgbGV0IGJvZHkgPSBcImVmbnNfdG9rZW49XCIgKyBzdHJfdG9rZW4gKyBcIiZlZm5zX3N0cl9pZD1cIiArIHN0cl9pZCArIFwiJmVmbnNfZmFza19pZD1cIiArIGZlZWRfaWQgKyBcIiZlZm5zX2ZhbnN3ZXJfdGV4dD1cIiArIHN0cl9mYW5zd2VyICsgXCImZWZuc19hdWRpbz1cIiArIGF1ZGlvX2lkICsgXCImZWZuc192aWRlbz1cIiArIHZpZGVvX2lkO1xuICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpO1xuICB9XG59XG4iXX0=