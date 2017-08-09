"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var bghttp = require("nativescript-background-http");
var globals_1 = require("../../globals/globals");
var FileUploadService = (function () {
    function FileUploadService(http) {
        this.http = http;
    }
    FileUploadService.prototype.uploadFile = function (str_token, str_type, str_name, cb) {
        var session = bghttp.session("image-upload");
        var url = globals_1.GlobalSettings.apiUrl + "uploadFile?type=" + str_type + "&name=" + str_name + "&token=" + str_token;
        var filename = "";
        var retVal = "";
        console.log(str_type);
        if (str_type == "video") {
            filename = new Date().getTime() + '.mp4';
        }
        else if (str_type == "audio") {
            filename = new Date().getTime() + '.mp3';
        }
        else if (str_type == "image") {
            filename = new Date().getTime() + '.jpg';
        }
        console.log(filename);
        var request = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            description: "{ 'uploading': '" + str_name + "' }"
        };
        var task = session.uploadFile(str_name, request);
        task.on("progress", logEvent);
        task.on("error", uploadError);
        task.on("complete", uploadComplete);
        function logEvent(e) {
            console.log(e.eventName);
        }
        function uploadError(e) {
            retVal = "error";
        }
        function uploadComplete(e) {
            retVal = e.response.getBodyAsString();
            cb(retVal);
        }
        // let options = new RequestOptions({headers: headers});
        // let body = "efns_token=" + str_token + "&use=" + str_use + "&efns_offset=" + num_offset;
        // console.log(body);
        // return this.http.post(url, body, options)
        //           .map((res: Response) => res.json());
    };
    return FileUploadService;
}());
FileUploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXVwbG9hZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZXVwbG9hZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF1RTtBQUV2RSxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLHFEQUF1RDtBQUV2RCxpREFBdUQ7QUFHdkQsSUFBYSxpQkFBaUI7SUFDNUIsMkJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBRTlCLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsRUFBRTtRQUNsRSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxHQUFHLHdCQUFjLENBQUMsTUFBTSxHQUFHLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDOUcsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLE9BQU8sR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHO1lBQ1IsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLDBCQUEwQjthQUM3QztZQUNELFdBQVcsRUFBRSxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsS0FBSztTQUNyRCxDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFcEMsa0JBQWtCLENBQUM7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELHFCQUFzQixDQUFDO1lBQ3JCLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFFbkIsQ0FBQztRQUVELHdCQUF5QixDQUFDO1lBQ3hCLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNiLENBQUM7UUFFRCx3REFBd0Q7UUFDeEQsMkZBQTJGO1FBQzNGLHFCQUFxQjtRQUNyQiw0Q0FBNEM7UUFDNUMsaURBQWlEO0lBQ25ELENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUF6REQsSUF5REM7QUF6RFksaUJBQWlCO0lBRDdCLGlCQUFVLEVBQUU7cUNBRWUsV0FBSTtHQURuQixpQkFBaUIsQ0F5RDdCO0FBekRZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgKiBhcyBiZ2h0dHAgZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWh0dHBcIjtcblxuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcblxuICB9XG5cbiAgdXBsb2FkRmlsZShzdHJfdG9rZW46IHN0cmluZywgc3RyX3R5cGU6IHN0cmluZywgc3RyX25hbWU6IHN0cmluZywgY2IpIHtcbiAgICB2YXIgc2Vzc2lvbiA9IGJnaHR0cC5zZXNzaW9uKFwiaW1hZ2UtdXBsb2FkXCIpO1xuICAgIGxldCB1cmwgPSBHbG9iYWxTZXR0aW5ncy5hcGlVcmwgKyBcInVwbG9hZEZpbGU/dHlwZT1cIiArIHN0cl90eXBlICsgXCImbmFtZT1cIiArIHN0cl9uYW1lICsgXCImdG9rZW49XCIgKyBzdHJfdG9rZW47XG4gICAgdmFyIGZpbGVuYW1lID0gXCJcIjtcbiAgICB2YXIgcmV0VmFsID0gXCJcIjtcblxuICAgIGNvbnNvbGUubG9nKHN0cl90eXBlKTtcblxuICAgIGlmIChzdHJfdHlwZSA9PSBcInZpZGVvXCIpIHtcbiAgICAgIGZpbGVuYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLm1wNCc7XG4gICAgfSBlbHNlIGlmIChzdHJfdHlwZSA9PSBcImF1ZGlvXCIpIHtcbiAgICAgIGZpbGVuYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLm1wMyc7XG4gICAgfSBlbHNlIGlmIChzdHJfdHlwZSA9PSBcImltYWdlXCIpIHtcbiAgICAgIGZpbGVuYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLmpwZyc7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coZmlsZW5hbWUpO1xuICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICAgICAgICB9LFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJ7ICd1cGxvYWRpbmcnOiAnXCIgKyBzdHJfbmFtZSArIFwiJyB9XCJcbiAgICB9O1xuXG4gICAgdmFyIHRhc2sgPSBzZXNzaW9uLnVwbG9hZEZpbGUoc3RyX25hbWUsIHJlcXVlc3QpO1xuXG4gICAgdGFzay5vbihcInByb2dyZXNzXCIsIGxvZ0V2ZW50KTtcbiAgICB0YXNrLm9uKFwiZXJyb3JcIiwgdXBsb2FkRXJyb3IpO1xuICAgIHRhc2sub24oXCJjb21wbGV0ZVwiLCB1cGxvYWRDb21wbGV0ZSk7XG5cbiAgICBmdW5jdGlvbiBsb2dFdmVudChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmV2ZW50TmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBsb2FkRXJyb3IgKGUpIHtcbiAgICAgIHJldFZhbCA9IFwiZXJyb3JcIjtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwbG9hZENvbXBsZXRlIChlKSB7XG4gICAgICByZXRWYWwgPSBlLnJlc3BvbnNlLmdldEJvZHlBc1N0cmluZygpO1xuICAgICAgY2IocmV0VmFsKTtcbiAgICB9XG5cbiAgICAvLyBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7aGVhZGVyczogaGVhZGVyc30pO1xuICAgIC8vIGxldCBib2R5ID0gXCJlZm5zX3Rva2VuPVwiICsgc3RyX3Rva2VuICsgXCImdXNlPVwiICsgc3RyX3VzZSArIFwiJmVmbnNfb2Zmc2V0PVwiICsgbnVtX29mZnNldDtcbiAgICAvLyBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCBvcHRpb25zKVxuICAgIC8vICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiByZXMuanNvbigpKTtcbiAgfVxufVxuIl19