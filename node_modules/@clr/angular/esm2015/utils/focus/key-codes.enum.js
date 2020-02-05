/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// Event.key key codes for standard browsers and IE/Edge
export var KeyCodes;
(function (KeyCodes) {
    KeyCodes["ArrowUp"] = "ArrowUp";
    KeyCodes["ArrowDown"] = "ArrowDown";
    KeyCodes["ArrowRight"] = "ArrowRight";
    KeyCodes["ArrowLeft"] = "ArrowLeft";
    KeyCodes["Space"] = " ";
    KeyCodes["Escape"] = "Escape";
    KeyCodes["Home"] = "Home";
    KeyCodes["End"] = "End";
    KeyCodes["Enter"] = "Enter";
    KeyCodes["Tab"] = "Tab";
})(KeyCodes || (KeyCodes = {}));
export var IEKeyCodes;
(function (IEKeyCodes) {
    IEKeyCodes["ArrowUp"] = "Up";
    IEKeyCodes["ArrowDown"] = "Down";
    IEKeyCodes["ArrowRight"] = "Right";
    IEKeyCodes["ArrowLeft"] = "Left";
    IEKeyCodes["Space"] = "Spacebar";
    IEKeyCodes["Escape"] = "Esc";
    IEKeyCodes["Home"] = "Home";
    IEKeyCodes["End"] = "End";
    IEKeyCodes["Enter"] = "Enter";
    IEKeyCodes["Tab"] = "Tab";
})(IEKeyCodes || (IEKeyCodes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWNvZGVzLmVudW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy9rZXktY29kZXMuZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsd0RBQXdEO0FBRXhELE1BQU0sQ0FBTixJQUFZLFFBV1g7QUFYRCxXQUFZLFFBQVE7SUFDbEIsK0JBQW1CLENBQUE7SUFDbkIsbUNBQXVCLENBQUE7SUFDdkIscUNBQXlCLENBQUE7SUFDekIsbUNBQXVCLENBQUE7SUFDdkIsdUJBQVcsQ0FBQTtJQUNYLDZCQUFpQixDQUFBO0lBQ2pCLHlCQUFhLENBQUE7SUFDYix1QkFBVyxDQUFBO0lBQ1gsMkJBQWUsQ0FBQTtJQUNmLHVCQUFXLENBQUE7QUFDYixDQUFDLEVBWFcsUUFBUSxLQUFSLFFBQVEsUUFXbkI7QUFFRCxNQUFNLENBQU4sSUFBWSxVQVdYO0FBWEQsV0FBWSxVQUFVO0lBQ3BCLDRCQUFjLENBQUE7SUFDZCxnQ0FBa0IsQ0FBQTtJQUNsQixrQ0FBb0IsQ0FBQTtJQUNwQixnQ0FBa0IsQ0FBQTtJQUNsQixnQ0FBa0IsQ0FBQTtJQUNsQiw0QkFBYyxDQUFBO0lBQ2QsMkJBQWEsQ0FBQTtJQUNiLHlCQUFXLENBQUE7SUFDWCw2QkFBZSxDQUFBO0lBQ2YseUJBQVcsQ0FBQTtBQUNiLENBQUMsRUFYVyxVQUFVLEtBQVYsVUFBVSxRQVdyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLy8gRXZlbnQua2V5IGtleSBjb2RlcyBmb3Igc3RhbmRhcmQgYnJvd3NlcnMgYW5kIElFL0VkZ2VcblxuZXhwb3J0IGVudW0gS2V5Q29kZXMge1xuICBBcnJvd1VwID0gJ0Fycm93VXAnLFxuICBBcnJvd0Rvd24gPSAnQXJyb3dEb3duJyxcbiAgQXJyb3dSaWdodCA9ICdBcnJvd1JpZ2h0JyxcbiAgQXJyb3dMZWZ0ID0gJ0Fycm93TGVmdCcsXG4gIFNwYWNlID0gJyAnLFxuICBFc2NhcGUgPSAnRXNjYXBlJyxcbiAgSG9tZSA9ICdIb21lJyxcbiAgRW5kID0gJ0VuZCcsXG4gIEVudGVyID0gJ0VudGVyJyxcbiAgVGFiID0gJ1RhYicsXG59XG5cbmV4cG9ydCBlbnVtIElFS2V5Q29kZXMge1xuICBBcnJvd1VwID0gJ1VwJyxcbiAgQXJyb3dEb3duID0gJ0Rvd24nLFxuICBBcnJvd1JpZ2h0ID0gJ1JpZ2h0JyxcbiAgQXJyb3dMZWZ0ID0gJ0xlZnQnLFxuICBTcGFjZSA9ICdTcGFjZWJhcicsXG4gIEVzY2FwZSA9ICdFc2MnLFxuICBIb21lID0gJ0hvbWUnLFxuICBFbmQgPSAnRW5kJyxcbiAgRW50ZXIgPSAnRW50ZXInLFxuICBUYWIgPSAnVGFiJyxcbn1cbiJdfQ==