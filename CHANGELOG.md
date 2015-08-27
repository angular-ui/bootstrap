<a name"0.13.3"></a>
### 0.13.3 (2015-08-09)


#### Bug Fixes

* **accordion:**
  * add `open` class when expanded ([ead15e37](https://github.com/angular-ui/bootstrap/commit/ead15e37), closes [#4152](https://github.com/angular-ui/bootstrap/issues/4152), [#3419](https://github.com/angular-ui/bootstrap/issues/3419))
  * revert to empty href ([b18dc8f9](https://github.com/angular-ui/bootstrap/commit/b18dc8f9), closes [#4104](https://github.com/angular-ui/bootstrap/issues/4104))
* **buttons:**
  * change to use `attrs.disabled` ([c9b0d0b0](https://github.com/angular-ui/bootstrap/commit/c9b0d0b0), closes [#4088](https://github.com/angular-ui/bootstrap/issues/4088))
  * allow selection of undisabled button ([707fbf55](https://github.com/angular-ui/bootstrap/commit/707fbf55), closes [#4088](https://github.com/angular-ui/bootstrap/issues/4088))
* **carousel:**
  * fix animation direction ([8359d73f](https://github.com/angular-ui/bootstrap/commit/8359d73f), closes [#4092](https://github.com/angular-ui/bootstrap/issues/4092), [#4087](https://github.com/angular-ui/bootstrap/issues/4087))
  * fix sorting of indicators ([8056368e](https://github.com/angular-ui/bootstrap/commit/8056368e), closes [#4071](https://github.com/angular-ui/bootstrap/issues/4071), [#3764](https://github.com/angular-ui/bootstrap/issues/3764))
* **dateparser:** Support 12-hour format and AM/PM ([1ecd82ce](https://github.com/angular-ui/bootstrap/commit/1ecd82ce), closes [#4117](https://github.com/angular-ui/bootstrap/issues/4117))
* **datepicker:**
  * commit safe apply on destruction ([74a8be4c](https://github.com/angular-ui/bootstrap/commit/74a8be4c), closes [#4079](https://github.com/angular-ui/bootstrap/issues/4079), [#4076](https://github.com/angular-ui/bootstrap/issues/4076))
  * change to `dateDisabled` ([5245ccad](https://github.com/angular-ui/bootstrap/commit/5245ccad), closes [#2773](https://github.com/angular-ui/bootstrap/issues/2773), [#4080](https://github.com/angular-ui/bootstrap/issues/4080))
* **dropdown:** handle `keyboard-nav` correctly ([0b37f088](https://github.com/angular-ui/bootstrap/commit/0b37f088), closes [#4110](https://github.com/angular-ui/bootstrap/issues/4110), [#4091](https://github.com/angular-ui/bootstrap/issues/4091))
* **modal:**
  * skipping ESC handling for form inputs ([a05b9c1a](https://github.com/angular-ui/bootstrap/commit/a05b9c1a), closes [#3551](https://github.com/angular-ui/bootstrap/issues/3551), [#2544](https://github.com/angular-ui/bootstrap/issues/2544))
  * add `$animateCss` support ([c7f19d58](https://github.com/angular-ui/bootstrap/commit/c7f19d58), closes [#4121](https://github.com/angular-ui/bootstrap/issues/4121), [#4119](https://github.com/angular-ui/bootstrap/issues/4119))
  * fix test ([e60c3ff6](https://github.com/angular-ui/bootstrap/commit/e60c3ff6))
  * dismiss modal on unschedule destruction ([3584061f](https://github.com/angular-ui/bootstrap/commit/3584061f), closes [#4097](https://github.com/angular-ui/bootstrap/issues/4097), [#3694](https://github.com/angular-ui/bootstrap/issues/3694))
* **progressbar:** fix `min-width` for Bootstrap 3.2 ([8dc13be9](https://github.com/angular-ui/bootstrap/commit/8dc13be9), closes [#4081](https://github.com/angular-ui/bootstrap/issues/4081), [#2511](https://github.com/angular-ui/bootstrap/issues/2511))
* **tooltip:**
  * add safety to `$apply` ([22b16f01](https://github.com/angular-ui/bootstrap/commit/22b16f01), closes [#3943](https://github.com/angular-ui/bootstrap/issues/3943), [#4150](https://github.com/angular-ui/bootstrap/issues/4150), [#516](https://github.com/angular-ui/bootstrap/issues/516))
  * tooltip w/ template position ([895a2281](https://github.com/angular-ui/bootstrap/commit/895a2281))
  * prevent opening when `tooltipPopupDelay` is present ([12c527af](https://github.com/angular-ui/bootstrap/commit/12c527af), closes [#4098](https://github.com/angular-ui/bootstrap/issues/4098), [#3611](https://github.com/angular-ui/bootstrap/issues/3611))
* **typeahead:** return `null` if empty ([c7d3a660](https://github.com/angular-ui/bootstrap/commit/c7d3a660), closes [#4078](https://github.com/angular-ui/bootstrap/issues/4078), [#3176](https://github.com/angular-ui/bootstrap/issues/3176))


#### Features

* **accordion:**
  * add `controllerAs` support ([9865ee8e](https://github.com/angular-ui/bootstrap/commit/9865ee8e), closes [#4138](https://github.com/angular-ui/bootstrap/issues/4138))
  * add `templateUrl` support ([f777c320](https://github.com/angular-ui/bootstrap/commit/f777c320), closes [#4084](https://github.com/angular-ui/bootstrap/issues/4084))
* **alert:** add `templateUrl` support ([88a885ca](https://github.com/angular-ui/bootstrap/commit/88a885ca), closes [#4139](https://github.com/angular-ui/bootstrap/issues/4139))
* **buttons:** add `controllerAs` support ([02872dc1](https://github.com/angular-ui/bootstrap/commit/02872dc1), closes [#4140](https://github.com/angular-ui/bootstrap/issues/4140))
* **carousel:**
  * add `templateUrl` support ([a29c8f20](https://github.com/angular-ui/bootstrap/commit/a29c8f20), closes [#4141](https://github.com/angular-ui/bootstrap/issues/4141))
  * expose carousel controller via `controllerAs` ([bfec07e4](https://github.com/angular-ui/bootstrap/commit/bfec07e4), closes [#4131](https://github.com/angular-ui/bootstrap/issues/4131))
* **datepicker:**
  * allow custom templates ([e04b06d7](https://github.com/angular-ui/bootstrap/commit/e04b06d7), closes [#4157](https://github.com/angular-ui/bootstrap/issues/4157), [#1913](https://github.com/angular-ui/bootstrap/issues/1913))
  * add `onOpenFocus` support ([68afc4c6](https://github.com/angular-ui/bootstrap/commit/68afc4c6), closes [#2303](https://github.com/angular-ui/bootstrap/issues/2303), [#2546](https://github.com/angular-ui/bootstrap/issues/2546), [#4146](https://github.com/angular-ui/bootstrap/issues/4146))
  * add support for dynamic `min-mode` and `max-mode` ([f3d263e1](https://github.com/angular-ui/bootstrap/commit/f3d263e1), closes [#3843](https://github.com/angular-ui/bootstrap/issues/3843), [#2618](https://github.com/angular-ui/bootstrap/issues/2618))
  * allow suppression of log error ([bab1d375](https://github.com/angular-ui/bootstrap/commit/bab1d375), closes [#3836](https://github.com/angular-ui/bootstrap/issues/3836), [#4115](https://github.com/angular-ui/bootstrap/issues/4115))
* **docs:**
  * add explanation of eye icon ([265d429b](https://github.com/angular-ui/bootstrap/commit/265d429b), closes [#4120](https://github.com/angular-ui/bootstrap/issues/4120))
  * add ngAnimate Plunker support ([a8a22cff](https://github.com/angular-ui/bootstrap/commit/a8a22cff), closes [#3648](https://github.com/angular-ui/bootstrap/issues/3648), [#4072](https://github.com/angular-ui/bootstrap/issues/4072))
* **modal:**
  * add ability to change class on body ([5a28ff76](https://github.com/angular-ui/bootstrap/commit/5a28ff76), closes [#2633](https://github.com/angular-ui/bootstrap/issues/2633), [#4132](https://github.com/angular-ui/bootstrap/issues/4132))
  * allow users to resolve with strings ([89368856](https://github.com/angular-ui/bootstrap/commit/89368856), closes [#2676](https://github.com/angular-ui/bootstrap/issues/2676), [#4124](https://github.com/angular-ui/bootstrap/issues/4124))
* **pagination:**
  * add classes to assist with styling ([b21c9abd](https://github.com/angular-ui/bootstrap/commit/b21c9abd), closes [#4130](https://github.com/angular-ui/bootstrap/issues/4130), [#4142](https://github.com/angular-ui/bootstrap/issues/4142))
  * add `templateUrl` support ([a0e1c91c](https://github.com/angular-ui/bootstrap/commit/a0e1c91c), closes [#4137](https://github.com/angular-ui/bootstrap/issues/4137))
* **timepicker:**
  * add documentation for max/min ([87fc242d](https://github.com/angular-ui/bootstrap/commit/87fc242d))
  * Added min/max attributes for timepicker. ([6c0010be](https://github.com/angular-ui/bootstrap/commit/6c0010be), closes [#4019](https://github.com/angular-ui/bootstrap/issues/4019))
* **tooltip:**
  * remove unnecessary `$digest` ([901a7c66](https://github.com/angular-ui/bootstrap/commit/901a7c66), closes [#4151](https://github.com/angular-ui/bootstrap/issues/4151))
  * add multiple trigger support ([ca9196fa](https://github.com/angular-ui/bootstrap/commit/ca9196fa), closes [#3987](https://github.com/angular-ui/bootstrap/issues/3987), [#4077](https://github.com/angular-ui/bootstrap/issues/4077))


#### Breaking Changes

* add `open` class to accordion group when expanded

Closes #4152
Closes #3419

 ([ead15e37](https://github.com/angular-ui/bootstrap/commit/ead15e37))
* Allow the user to hit `esc` inside an element in a modal and not exit the modal if the event has been `defaultPrevented`

Closes #3551
Fixes #2544

 ([a05b9c1a](https://github.com/angular-ui/bootstrap/commit/a05b9c1a))
* Change validation key to `dateDisabled` to align better with Angular's convention

Closes #2773
Closes #4080

 ([5245ccad](https://github.com/angular-ui/bootstrap/commit/5245ccad))


<a name"0.13.2"></a>
### 0.13.2 (2015-08-02)


#### Bug Fixes

* **accordion:** apply disabled style to accordion-header ([0643fd3e](https://github.com/angular-ui/bootstrap/commit/0643fd3e), closes [#3599](https://github.com/angular-ui/bootstrap/issues/3599), [#3233](https://github.com/angular-ui/bootstrap/issues/3233))
* **buttons:** respect disabled attribute ([42e1af5c](https://github.com/angular-ui/bootstrap/commit/42e1af5c), closes [#4026](https://github.com/angular-ui/bootstrap/issues/4026), [#4013](https://github.com/angular-ui/bootstrap/issues/4013))
* **carousel:**
  * fix animations with 1.4 ([f45b4a4c](https://github.com/angular-ui/bootstrap/commit/f45b4a4c), closes [#3946](https://github.com/angular-ui/bootstrap/issues/3946), [#4041](https://github.com/angular-ui/bootstrap/issues/4041), [#3811](https://github.com/angular-ui/bootstrap/issues/3811))
  * clear `currentSlide` when there are no slides ([0c78026b](https://github.com/angular-ui/bootstrap/commit/0c78026b), closes [#4021](https://github.com/angular-ui/bootstrap/issues/4021))
* **dateparser:** add type and validity check ([4f1e03f1](https://github.com/angular-ui/bootstrap/commit/4f1e03f1), closes [#3701](https://github.com/angular-ui/bootstrap/issues/3701), [#3759](https://github.com/angular-ui/bootstrap/issues/3759), [#3933](https://github.com/angular-ui/bootstrap/issues/3933), [#3609](https://github.com/angular-ui/bootstrap/issues/3609), [#3713](https://github.com/angular-ui/bootstrap/issues/3713), [#3736](https://github.com/angular-ui/bootstrap/issues/3736), [#3875](https://github.com/angular-ui/bootstrap/issues/3875), [#3937](https://github.com/angular-ui/bootstrap/issues/3937), [#3976](https://github.com/angular-ui/bootstrap/issues/3976))
* **datepicker:**
  * change to contains ([9f73d240](https://github.com/angular-ui/bootstrap/commit/9f73d240), closes [#4066](https://github.com/angular-ui/bootstrap/issues/4066), [#3076](https://github.com/angular-ui/bootstrap/issues/3076))
  * *BREAKING CHANGE* remove `new Date` fallback ([ab4580fd](https://github.com/angular-ui/bootstrap/commit/ab4580fd), closes [#2513](https://github.com/angular-ui/bootstrap/issues/2513), [#3294](https://github.com/angular-ui/bootstrap/issues/3294), [#3344](https://github.com/angular-ui/bootstrap/issues/3344), [#3682](https://github.com/angular-ui/bootstrap/issues/3682), [#4092](https://github.com/angular-ui/bootstrap/issues/4092), [#1289](https://github.com/angular-ui/bootstrap/issues/1289), [#2446](https://github.com/angular-ui/bootstrap/issues/2446), [#3037](https://github.com/angular-ui/bootstrap/issues/3037), [#3104](https://github.com/angular-ui/bootstrap/issues/3104), [#3196](https://github.com/angular-ui/bootstrap/issues/3196), [#3206](https://github.com/angular-ui/bootstrap/issues/3206), [#3342](https://github.com/angular-ui/bootstrap/issues/3342), [#3617](https://github.com/angular-ui/bootstrap/issues/3617), [#3644](https://github.com/angular-ui/bootstrap/issues/3644))
  * ensure `initDate` is on an object ([577b2a2a](https://github.com/angular-ui/bootstrap/commit/577b2a2a), closes [#3625](https://github.com/angular-ui/bootstrap/issues/3625))
  * change to higher max date ([32e73280](https://github.com/angular-ui/bootstrap/commit/32e73280), closes [#4042](https://github.com/angular-ui/bootstrap/issues/4042))
  * fix validation with `ngRequired` ([fe0d954a](https://github.com/angular-ui/bootstrap/commit/fe0d954a), closes [#4002](https://github.com/angular-ui/bootstrap/issues/4002), [#3862](https://github.com/angular-ui/bootstrap/issues/3862))
  * set to `null` if not present ([a65a5fa1](https://github.com/angular-ui/bootstrap/commit/a65a5fa1), closes [#4014](https://github.com/angular-ui/bootstrap/issues/4014))
* **dropdown:** add safety check for setIsOpen ([60e43160](https://github.com/angular-ui/bootstrap/commit/60e43160), closes [#4030](https://github.com/angular-ui/bootstrap/issues/4030))
* **modal:**
  * properly garbage collect DOM node ([1e8297be](https://github.com/angular-ui/bootstrap/commit/1e8297be), closes [#2875](https://github.com/angular-ui/bootstrap/issues/2875))
  * fix `bindToController` implementation ([811bf96e](https://github.com/angular-ui/bootstrap/commit/811bf96e), closes [#4054](https://github.com/angular-ui/bootstrap/issues/4054), [#4051](https://github.com/angular-ui/bootstrap/issues/4051))
  * animate backdrop concurrently with window ([c55ee4f5](https://github.com/angular-ui/bootstrap/commit/c55ee4f5), closes [#4039](https://github.com/angular-ui/bootstrap/issues/4039), [#4036](https://github.com/angular-ui/bootstrap/issues/4036))
* **progressbar:**
  * use more visible color ([1afc5d1d](https://github.com/angular-ui/bootstrap/commit/1afc5d1d), closes [#4044](https://github.com/angular-ui/bootstrap/issues/4044))
  * allow max width of 100% ([2e9177e5](https://github.com/angular-ui/bootstrap/commit/2e9177e5), closes [#4027](https://github.com/angular-ui/bootstrap/issues/4027), [#4018](https://github.com/angular-ui/bootstrap/issues/4018))
* **tooltip:**
  * update tooltip placement dynamically ([13df1c93](https://github.com/angular-ui/bootstrap/commit/13df1c93), closes [#3980](https://github.com/angular-ui/bootstrap/issues/3980), [#3978](https://github.com/angular-ui/bootstrap/issues/3978))
  * prevent 1px shift in Webkit/Blink ([632aa820](https://github.com/angular-ui/bootstrap/commit/632aa820), closes [#3964](https://github.com/angular-ui/bootstrap/issues/3964))
* **typeahead:**
  * reset matches if enter is hit ([25704838](https://github.com/angular-ui/bootstrap/commit/25704838), closes [#4063](https://github.com/angular-ui/bootstrap/issues/4063), [#3545](https://github.com/angular-ui/bootstrap/issues/3545))
  * only reset matches if matches are present ([97e077e1](https://github.com/angular-ui/bootstrap/commit/97e077e1), closes [#3119](https://github.com/angular-ui/bootstrap/issues/3119))


#### Features

* **build:** add support for npm publishing ([27f7ca26](https://github.com/angular-ui/bootstrap/commit/27f7ca26), closes [#3108](https://github.com/angular-ui/bootstrap/issues/3108))
* **modal:** trap focus in modal for tabbing ([a028d2aa](https://github.com/angular-ui/bootstrap/commit/a028d2aa), closes [#3689](https://github.com/angular-ui/bootstrap/issues/3689), [#4004](https://github.com/angular-ui/bootstrap/issues/4004), [#738](https://github.com/angular-ui/bootstrap/issues/738))
* **popover:** add custom template support ([a9d3d253](https://github.com/angular-ui/bootstrap/commit/a9d3d253), closes [#4056](https://github.com/angular-ui/bootstrap/issues/4056), [#4057](https://github.com/angular-ui/bootstrap/issues/4057))
* **rating:** add title support for stars ([713c8487](https://github.com/angular-ui/bootstrap/commit/713c8487), closes [#3621](https://github.com/angular-ui/bootstrap/issues/3621))
* **typeahead:**
  * add `noResults` indicator binding ([647cdd93](https://github.com/angular-ui/bootstrap/commit/647cdd93), closes [#2016](https://github.com/angular-ui/bootstrap/issues/2016), [#2792](https://github.com/angular-ui/bootstrap/issues/2792), [#4068](https://github.com/angular-ui/bootstrap/issues/4068))
  * add `typeaheadSelectOnExact` support ([277b30ca](https://github.com/angular-ui/bootstrap/commit/277b30ca), closes [#3365](https://github.com/angular-ui/bootstrap/issues/3365), [#3310](https://github.com/angular-ui/bootstrap/issues/3310))


<a name"0.13.1"></a>
### 0.13.1 (2015-07-23)


#### Bug Fixes

* **accordion:** add CSP compliance for accordion & typeahead ([fb302c60](https://github.com/angular-ui/bootstrap/commit/fb302c60), closes [#3909](https://github.com/angular-ui/bootstrap/issues/3909), [#3904](https://github.com/angular-ui/bootstrap/issues/3904))
* **alert:**
  * adjust check for close attribute ([13a0354f](https://github.com/angular-ui/bootstrap/commit/13a0354f), closes [#3864](https://github.com/angular-ui/bootstrap/issues/3864), [#3890](https://github.com/angular-ui/bootstrap/issues/3890), [#3848](https://github.com/angular-ui/bootstrap/issues/3848))
  * rename alert-dismissable to alert-dismissible ([d631af5a](https://github.com/angular-ui/bootstrap/commit/d631af5a))
* **carousel:**
  * change to avoid references to debug info ([ca07ad7c](https://github.com/angular-ui/bootstrap/commit/ca07ad7c), closes [#3795](https://github.com/angular-ui/bootstrap/issues/3795), [#3794](https://github.com/angular-ui/bootstrap/issues/3794))
  * ensure there are slides present ([115d490a](https://github.com/angular-ui/bootstrap/commit/115d490a), closes [#3755](https://github.com/angular-ui/bootstrap/issues/3755))
  * disable transition until animation completes ([ef45ecf8](https://github.com/angular-ui/bootstrap/commit/ef45ecf8), closes [#3729](https://github.com/angular-ui/bootstrap/issues/3729), [#3757](https://github.com/angular-ui/bootstrap/issues/3757))
* **collapse:** fix occasional flickering ([ede9ea46](https://github.com/angular-ui/bootstrap/commit/ede9ea46), closes [#3804](https://github.com/angular-ui/bootstrap/issues/3804), [#3801](https://github.com/angular-ui/bootstrap/issues/3801))
* **datepicker:**
  * change to min width cells ([5567c432](https://github.com/angular-ui/bootstrap/commit/5567c432), closes [#4000](https://github.com/angular-ui/bootstrap/issues/4000), [#3941](https://github.com/angular-ui/bootstrap/issues/3941))
  * fix OS dependent time zone issue ([f1412014](https://github.com/angular-ui/bootstrap/commit/f1412014), closes [#3079](https://github.com/angular-ui/bootstrap/issues/3079))
  * Apply custom class to month ([eb3b32ec](https://github.com/angular-ui/bootstrap/commit/eb3b32ec), closes [#3863](https://github.com/angular-ui/bootstrap/issues/3863))
  * check if getter.assign is function ([ed10899d](https://github.com/angular-ui/bootstrap/commit/ed10899d), closes [#3155](https://github.com/angular-ui/bootstrap/issues/3155), [#3345](https://github.com/angular-ui/bootstrap/issues/3345), [#3719](https://github.com/angular-ui/bootstrap/issues/3719))
* **dropdown:**
  * do not autoclose with outsideClick and append to body ([cc66a068](https://github.com/angular-ui/bootstrap/commit/cc66a068), closes [#3792](https://github.com/angular-ui/bootstrap/issues/3792), [#3645](https://github.com/angular-ui/bootstrap/issues/3645))
  * avoid matching 138 & 140 ([41ebd984](https://github.com/angular-ui/bootstrap/commit/41ebd984))
  * align when using dropdown-menu-body ([2332f14d](https://github.com/angular-ui/bootstrap/commit/2332f14d), closes [#3913](https://github.com/angular-ui/bootstrap/issues/3913), [#3820](https://github.com/angular-ui/bootstrap/issues/3820))
  * call toggle after animation ([054341b7](https://github.com/angular-ui/bootstrap/commit/054341b7), closes [#3513](https://github.com/angular-ui/bootstrap/issues/3513), [#3655](https://github.com/angular-ui/bootstrap/issues/3655), [#3511](https://github.com/angular-ui/bootstrap/issues/3511))
  * do not close on $locationChangeSuccess ([e5a1e88f](https://github.com/angular-ui/bootstrap/commit/e5a1e88f), closes [#3683](https://github.com/angular-ui/bootstrap/issues/3683), [#3704](https://github.com/angular-ui/bootstrap/issues/3704))
* **modal:**
  * backdrop animation on AngularJS 1.4 ([158d2676](https://github.com/angular-ui/bootstrap/commit/158d2676), closes [#3896](https://github.com/angular-ui/bootstrap/issues/3896))
  * closing breaks on missing scope, 1.4 ([0286828b](https://github.com/angular-ui/bootstrap/commit/0286828b), closes [#3787](https://github.com/angular-ui/bootstrap/issues/3787), [#3806](https://github.com/angular-ui/bootstrap/issues/3806), [#3873](https://github.com/angular-ui/bootstrap/issues/3873), [#3888](https://github.com/angular-ui/bootstrap/issues/3888))
  * remove illegal character ([dd4f3cc8](https://github.com/angular-ui/bootstrap/commit/dd4f3cc8), closes [#3893](https://github.com/angular-ui/bootstrap/issues/3893), [#3892](https://github.com/angular-ui/bootstrap/issues/3892))
  * focus on body if element disappears ([988336cc](https://github.com/angular-ui/bootstrap/commit/988336cc), closes [#3653](https://github.com/angular-ui/bootstrap/issues/3653), [#3639](https://github.com/angular-ui/bootstrap/issues/3639))
* **progressbar:** use max value on stacked progress bar ([36e0f0ea](https://github.com/angular-ui/bootstrap/commit/36e0f0ea), closes [#3830](https://github.com/angular-ui/bootstrap/issues/3830), [#3618](https://github.com/angular-ui/bootstrap/issues/3618))
* **rating:** Set rating to 0 when same value is selected ([dbceec76](https://github.com/angular-ui/bootstrap/commit/dbceec76), closes [#3963](https://github.com/angular-ui/bootstrap/issues/3963), [#3246](https://github.com/angular-ui/bootstrap/issues/3246))
* **tabs:** fix empty href ([2b27dcbf](https://github.com/angular-ui/bootstrap/commit/2b27dcbf), closes [#3799](https://github.com/angular-ui/bootstrap/issues/3799))
* **typeahead:**
  * select match on tab for iOS webview ([5b37bb8b](https://github.com/angular-ui/bootstrap/commit/5b37bb8b), closes [#3762](https://github.com/angular-ui/bootstrap/issues/3762), [#3699](https://github.com/angular-ui/bootstrap/issues/3699))
  * don't close popup on right click ([7d1c4600](https://github.com/angular-ui/bootstrap/commit/7d1c4600), closes [#3975](https://github.com/angular-ui/bootstrap/issues/3975), [#3973](https://github.com/angular-ui/bootstrap/issues/3973))
  * close dropdown on tab with no selection ([493510d0](https://github.com/angular-ui/bootstrap/commit/493510d0), closes [#3340](https://github.com/angular-ui/bootstrap/issues/3340))
  * do not execute unnecessary $digest ([0d96221f](https://github.com/angular-ui/bootstrap/commit/0d96221f), closes [#2652](https://github.com/angular-ui/bootstrap/issues/2652), [#3791](https://github.com/angular-ui/bootstrap/issues/3791))
  * add href to show cursor as pointer ([195e520e](https://github.com/angular-ui/bootstrap/commit/195e520e), closes [#3649](https://github.com/angular-ui/bootstrap/issues/3649))


#### Features

* **alert:** pass $event to close() ([44e06425](https://github.com/angular-ui/bootstrap/commit/44e06425), closes [#3828](https://github.com/angular-ui/bootstrap/issues/3828), [#3827](https://github.com/angular-ui/bootstrap/issues/3827))
* **carousel:** add `noWrap` option to prevent re-cycling of slides ([7fb3840f](https://github.com/angular-ui/bootstrap/commit/7fb3840f), closes [#3462](https://github.com/angular-ui/bootstrap/issues/3462), [#3397](https://github.com/angular-ui/bootstrap/issues/3397))
* **collapse:** add accessibility support ([92551342](https://github.com/angular-ui/bootstrap/commit/92551342), closes [#3920](https://github.com/angular-ui/bootstrap/issues/3920))
* **dropdown:**
  * add dropdown classes dynamically ([4af83ade](https://github.com/angular-ui/bootstrap/commit/4af83ade), closes [#3984](https://github.com/angular-ui/bootstrap/issues/3984), [#3986](https://github.com/angular-ui/bootstrap/issues/3986))
  * add accessibility attributes ([14689e05](https://github.com/angular-ui/bootstrap/commit/14689e05), closes [#3951](https://github.com/angular-ui/bootstrap/issues/3951))
  * add keynav support to dropdown ([62359370](https://github.com/angular-ui/bootstrap/commit/62359370), closes [#3685](https://github.com/angular-ui/bootstrap/issues/3685), [#3212](https://github.com/angular-ui/bootstrap/issues/3212), [#1228](https://github.com/angular-ui/bootstrap/issues/1228))
  * support optional templates for dropdown menus ([83c4266c](https://github.com/angular-ui/bootstrap/commit/83c4266c))
* **modal:** add support for bindToController ([8adfc833](https://github.com/angular-ui/bootstrap/commit/8adfc833), closes [#3965](https://github.com/angular-ui/bootstrap/issues/3965), [#3404](https://github.com/angular-ui/bootstrap/issues/3404))
* **pagination:** add support for `ng-disabled` ([f6edfa5d](https://github.com/angular-ui/bootstrap/commit/f6edfa5d), closes [#3956](https://github.com/angular-ui/bootstrap/issues/3956))
* **timepicker:** add `showSpinner` flag ([1f760eb3](https://github.com/angular-ui/bootstrap/commit/1f760eb3))
* **typeahead:**
  * add 'select on blur' option. ([68cac59a](https://github.com/angular-ui/bootstrap/commit/68cac59a), closes [#3445](https://github.com/angular-ui/bootstrap/issues/3445))
  * popup position ([86bfec19](https://github.com/angular-ui/bootstrap/commit/86bfec19), closes [#3874](https://github.com/angular-ui/bootstrap/issues/3874))
  * handles min-length of 0 ([a5a25141](https://github.com/angular-ui/bootstrap/commit/a5a25141), closes [#3600](https://github.com/angular-ui/bootstrap/issues/3600))


<a name="0.13.0"></a>
## 0.13.0 (2015-05-02)


#### Bug Fixes

* **accordion:**
  * Made accordion heading tab-able for IE9-10 ([6abad509](https://github.com/angular-ui/bootstrap/commit/6abad509cd4d44c3ca432f2f21c9ecea0a206b53))
  * noop for href in header to prevent page refresh with nested buttons canceling ev ([9ca4ec39](https://github.com/angular-ui/bootstrap/commit/9ca4ec399be0e0e8f6c3fe6fd924a7d94ce669b5))
* **buttons:** add unit tests for buttons ([9468d723](https://github.com/angular-ui/bootstrap/commit/9468d7239dd6eed4a3a2945f6761f7a2fa97222b), closes [#3030](https://github.com/angular-ui/bootstrap/issues/3030))
* **carousel:** respect the order of the slides ([b5f220fa](https://github.com/angular-ui/bootstrap/commit/b5f220fa8483f5743ba6ab3610f5064bf5c71be7), closes [#488](https://github.com/angular-ui/bootstrap/issues/488))
* **changelog:** add comment on breaking change ([f02c1bbb](https://github.com/angular-ui/bootstrap/commit/f02c1bbbf7777bee9cbb4a038730fb475337a2c5), closes [#2675](https://github.com/angular-ui/bootstrap/issues/2675))
* **dateparser:** add extra validation constraint to days ([c19b8879](https://github.com/angular-ui/bootstrap/commit/c19b8879e902e8753b4077e7983ec629242436fc))
* **datepicker:**
  * week count issues ([39e5fd3e](https://github.com/angular-ui/bootstrap/commit/39e5fd3e4981f311d237d21c37a89cde9f42f0d6), closes [#2506](https://github.com/angular-ui/bootstrap/issues/2506), [#3120](https://github.com/angular-ui/bootstrap/issues/3120), [#2306](https://github.com/angular-ui/bootstrap/issues/2306))
  * make 'show-weeks' work on datepickerPopup ([d0cc7284](https://github.com/angular-ui/bootstrap/commit/d0cc72841b9641b768cc5eb184de2dbbaa804e2d), closes [#3143](https://github.com/angular-ui/bootstrap/issues/3143), [#3149](https://github.com/angular-ui/bootstrap/issues/3149))
  * datepicker-popup compatibility with ngModelOptions ([d024dd77](https://github.com/angular-ui/bootstrap/commit/d024dd77ed6a20983bea5b90b75481c93f17980f), closes [#3349](https://github.com/angular-ui/bootstrap/issues/3349))
  * disable title button when in max mode ([35b8512a](https://github.com/angular-ui/bootstrap/commit/35b8512ac7949eba7d432760f83748bb2bb893c1), closes [#3012](https://github.com/angular-ui/bootstrap/issues/3012))
  * add shortcutPropagation to datepickerPopup ([13bd516c](https://github.com/angular-ui/bootstrap/commit/13bd516cfcc1b2ee940112675830f7ce3d93ea4f))
  * fixed shortcut event kill by adding option ([89ab4580](https://github.com/angular-ui/bootstrap/commit/89ab4580cd3d0bbdf63e02fbebe2cb3a9f2616dd))
  * fix initDate implementation in datepicker ([98e2bdfc](https://github.com/angular-ui/bootstrap/commit/98e2bdfc8b4dd108acdf3fac75a795675889bbc7))
  * Fix init-date not applying on datepicker-popup ([c5b63ded](https://github.com/angular-ui/bootstrap/commit/c5b63ded0aebd7ae80f238bd0a33f1d9c0746dba))
  * Make datepicker respect dateFormat inside ng-if ([2c2dba6d](https://github.com/angular-ui/bootstrap/commit/2c2dba6d145c95500efe7f6be6248d56ae1aebee))
  * `ng-model` value can be a timestamp ([d253208b](https://github.com/angular-ui/bootstrap/commit/d253208bd7ebbd6209c6a25f70e010123198fcd7), closes [#2345](https://github.com/angular-ui/bootstrap/issues/2345))
  * Parse date from $viewValue instead of $modelValue ([0ecf7faa](https://github.com/angular-ui/bootstrap/commit/0ecf7faad3b340e171e5c8ca17a17597fa6e6596))
  * don't stop ESC propagation unless dropdown is open ([c2e5b284](https://github.com/angular-ui/bootstrap/commit/c2e5b284a31fc992b8230b89dc98ed757d155493), closes [#3096](https://github.com/angular-ui/bootstrap/issues/3096), [#3179](https://github.com/angular-ui/bootstrap/issues/3179))
  * date formatting when using angular 1.3 fixes #2659 ([23936f9f](https://github.com/angular-ui/bootstrap/commit/23936f9f6ec7170b56c7f13345ae022c74fa3034), closes [#3293](https://github.com/angular-ui/bootstrap/issues/3293), [#3279](https://github.com/angular-ui/bootstrap/issues/3279), [#2440](https://github.com/angular-ui/bootstrap/issues/2440), [#2932](https://github.com/angular-ui/bootstrap/issues/2932), [#3074](https://github.com/angular-ui/bootstrap/issues/3074), [#2943](https://github.com/angular-ui/bootstrap/issues/2943), [#2733](https://github.com/angular-ui/bootstrap/issues/2733), [#3047](https://github.com/angular-ui/bootstrap/issues/3047), [#2659](https://github.com/angular-ui/bootstrap/issues/2659), [#2681](https://github.com/angular-ui/bootstrap/issues/2681))
  * date formatting when using angular 1.3 fixes #2659 ([5f9afe5a](https://github.com/angular-ui/bootstrap/commit/5f9afe5a86af0e207eaacd6a9b1f202fd78d7009))
* **demo:** Modify the demo app to play nice with Angular 1.3 ([aa0b6392](https://github.com/angular-ui/bootstrap/commit/aa0b6392db57d436d7c203cf05555d708c945322), closes [#3098](https://github.com/angular-ui/bootstrap/issues/3098))
* **dropdown:** Fix $digest:inprog on dropdown dismissal ([4a06adba](https://github.com/angular-ui/bootstrap/commit/4a06adbac6c1c1fa6b0182ca9bd7335eda89c43f), closes [#3274](https://github.com/angular-ui/bootstrap/issues/3274))
* **grunt:** fix typo in gruntfile ([f0cadb1f](https://github.com/angular-ui/bootstrap/commit/f0cadb1f1a6b8d994c2df3313a2121e92a36bddb), closes [#3589](https://github.com/angular-ui/bootstrap/issues/3589))
* **modal:**
  * Use attribute observe and add a render promise. ([99af5f8a](https://github.com/angular-ui/bootstrap/commit/99af5f8a369b13b018ec1e592d82a1a140cbb6bb))
  * fix minor grammar error ([22a21448](https://github.com/angular-ui/bootstrap/commit/22a21448cbad1448bd4541bd0ce3fc8d3515943d), closes [#3519](https://github.com/angular-ui/bootstrap/issues/3519))
  * Fix focus when the dialog is close or cancelled ([e6b105ae](https://github.com/angular-ui/bootstrap/commit/e6b105ae39bcbcf468c3e32057c6acb5ab50d4ce), closes [#2888](https://github.com/angular-ui/bootstrap/issues/2888))
  * allow for custom user modal sizes ([85eeb954](https://github.com/angular-ui/bootstrap/commit/85eeb95428e0dd367cf3e251f2d01fc8dc899dd4), closes [#3429](https://github.com/angular-ui/bootstrap/issues/3429), [#3431](https://github.com/angular-ui/bootstrap/issues/3431))
  * Autofocus corrects the second time that the modal is open ([e5f5f75b](https://github.com/angular-ui/bootstrap/commit/e5f5f75b370b6d4806da87bec575b7084e30c520), closes [#2802](https://github.com/angular-ui/bootstrap/issues/2802))
  * fix messages on modal test failed ([ab919f9f](https://github.com/angular-ui/bootstrap/commit/ab919f9f89aeaaa336b5d3fe1aed1e0617b5a482))
* **pagination:**
  * remove focus from prior clicked elements ([33269bb6](https://github.com/angular-ui/bootstrap/commit/33269bb6b444cdca18e08063814d39c5ef502589), closes [#3488](https://github.com/angular-ui/bootstrap/issues/3488), [#3486](https://github.com/angular-ui/bootstrap/issues/3486))
  * fixes issue when init called after watch triggered ([26b40903](https://github.com/angular-ui/bootstrap/commit/26b40903abf012b5d3d35154d6210119ac9a76d4), closes [#2257](https://github.com/angular-ui/bootstrap/issues/2257), [#2227](https://github.com/angular-ui/bootstrap/issues/2227))
* **popover:**
  * prevent wrong positioning from title ([c8156c7e](https://github.com/angular-ui/bootstrap/commit/c8156c7e21d0f3a61fc19d59644ae24c423eb5c6), closes [#3518](https://github.com/angular-ui/bootstrap/issues/3518))
  * animations with ngAnimate ([c2ace472](https://github.com/angular-ui/bootstrap/commit/c2ace47225ecb337328a16d2c95744e0d37ce80f), closes [#3509](https://github.com/angular-ui/bootstrap/issues/3509), [#3375](https://github.com/angular-ui/bootstrap/issues/3375), [#3506](https://github.com/angular-ui/bootstrap/issues/3506))
  * make it work with ngAnimate ([461087b5](https://github.com/angular-ui/bootstrap/commit/461087b5ff360e1d06d6724375ab29169a89fcf2), closes [#3482](https://github.com/angular-ui/bootstrap/issues/3482), [#3375](https://github.com/angular-ui/bootstrap/issues/3375))
* **progressbar:** limit max width to 100% ([489961e1](https://github.com/angular-ui/bootstrap/commit/489961e1a0036ddab4e719a772382209a595f163), closes [#3005](https://github.com/angular-ui/bootstrap/issues/3005))
* **tab:** change to `disable` attribute ([4bfae223](https://github.com/angular-ui/bootstrap/commit/4bfae2238d08d7edea8e6dfe99051192a16d6587), closes [#2677](https://github.com/angular-ui/bootstrap/issues/2677))
* **timepicker:**
  * move render logic to formatter ([b4bbc019](https://github.com/angular-ui/bootstrap/commit/b4bbc0198284d90085bd85840dffd030345d5211), closes [#3160](https://github.com/angular-ui/bootstrap/issues/3160), [#3427](https://github.com/angular-ui/bootstrap/issues/3427))
  * remove ng-mousewheel binding ([a726b7cd](https://github.com/angular-ui/bootstrap/commit/a726b7cd47d417ed656aef3af012e7b6c7b00bf4), closes [#3442](https://github.com/angular-ui/bootstrap/issues/3442))
  * fix widths of inputs when inside form-inline ([8e89440b](https://github.com/angular-ui/bootstrap/commit/8e89440ba86d26d74ed799843cde7f9f2bf26c0b))
  * Stringify pad return when value >= 10 ([405dab65](https://github.com/angular-ui/bootstrap/commit/405dab65f72f5bed488eb8f5dfa5a1a848c4a606))
* **tooltip:**
  * template type should respect popup class ([6af627a8](https://github.com/angular-ui/bootstrap/commit/6af627a8edcbce0370ca2d90f9a575cd6770f6c1), closes [#3569](https://github.com/angular-ui/bootstrap/issues/3569))
  * tooltip-html should not open if empty ([34044a77](https://github.com/angular-ui/bootstrap/commit/34044a77070bc809220e2ed6b628393889c40b86), closes [#3563](https://github.com/angular-ui/bootstrap/issues/3563))
  * use correct prefix for -template ([9ca9d7f5](https://github.com/angular-ui/bootstrap/commit/9ca9d7f5263d8d5e0a9de18c2b75f64aca7c5255), closes [#3498](https://github.com/angular-ui/bootstrap/issues/3498), [#3473](https://github.com/angular-ui/bootstrap/issues/3473))
  * Fix for issue #3167 ([87a36076](https://github.com/angular-ui/bootstrap/commit/87a3607632cae03ead57b377bb91ca27610e7730))
* **typeahead:**
  * Fix for memory-leak in typeahead ([b5a80c08](https://github.com/angular-ui/bootstrap/commit/b5a80c08f2364db2170766366cc7433661e737ae))
  * reset 'parse' validation key ([c0a9c707](https://github.com/angular-ui/bootstrap/commit/c0a9c707903fa3dfc662887cd348ee2b0bf13f85), closes [#3166](https://github.com/angular-ui/bootstrap/issues/3166))
  * resolve property length of undefined error ([950c22cd](https://github.com/angular-ui/bootstrap/commit/950c22cdab3d0b3479a0d0515ed64e57c9ff046b), closes [#2999](https://github.com/angular-ui/bootstrap/issues/2999), [#3178](https://github.com/angular-ui/bootstrap/issues/3178))
  * set validity if model is set manually ([b0044433](https://github.com/angular-ui/bootstrap/commit/b004443371d75bb61e9a17a00a58b485c1279aee), closes [#3318](https://github.com/angular-ui/bootstrap/issues/3318))
  * $compile match template after adding to DOM ([03446c56](https://github.com/angular-ui/bootstrap/commit/03446c56335d5ee0970f9730af215fea1dd53f48))


#### Features

* **dateparser:**
  * Add support for HH, H, mm, m, ss, s formats ([971a1b57](https://github.com/angular-ui/bootstrap/commit/971a1b57394c1e1088564e0809c1341620586aa0), closes [#2509](https://github.com/angular-ui/bootstrap/issues/2509), [#3159](https://github.com/angular-ui/bootstrap/issues/3159), [#3417](https://github.com/angular-ui/bootstrap/issues/3417))
  * add support for milliseconds ([82cb637d](https://github.com/angular-ui/bootstrap/commit/82cb637dd12288d9fa0d42783f672fc71b94ffda), closes [#3537](https://github.com/angular-ui/bootstrap/issues/3537))
* **datepicker:**
  * support HTML5 month input type ([aef8953c](https://github.com/angular-ui/bootstrap/commit/aef8953c792066c008d8ce97918153f756a39112), closes [#3499](https://github.com/angular-ui/bootstrap/issues/3499))
  * support HTML5 date input type ([1a9e88fe](https://github.com/angular-ui/bootstrap/commit/1a9e88fe9e6a078943273012429788e742f8ebbd), closes [#3499](https://github.com/angular-ui/bootstrap/issues/3499))
  * Add custom class to specific days via outside logic ([0bcd30c4](https://github.com/angular-ui/bootstrap/commit/0bcd30c4a6d65763e1c4d1b6820a4537a11e95ee))
* **dropdown:**
  * Dropdown append-to-body ([dfe9854b](https://github.com/angular-ui/bootstrap/commit/dfe9854be3d0ae82f361cefec19a6f692aa41591), closes [#3411](https://github.com/angular-ui/bootstrap/issues/3411), [#1030](https://github.com/angular-ui/bootstrap/issues/1030))
  * Make Auto-Close Dropdowns optional. ([a50f1120](https://github.com/angular-ui/bootstrap/commit/a50f11201eeb18569dca0ac3bb157e43cb9d9076), closes [#2218](https://github.com/angular-ui/bootstrap/issues/2218), [#3045](https://github.com/angular-ui/bootstrap/issues/3045))
* **modal:**
  * Add a vetoable modal.closing event ([a5a82d9b](https://github.com/angular-ui/bootstrap/commit/a5a82d9be7dc0bd1cfd510bacf9aa411c6efe1bc))
  * pass reason when opened promise rejected ([0ad208d6](https://github.com/angular-ui/bootstrap/commit/0ad208d6a0164517b85d8e8181e4a0fc98f4f5ec), closes [#2978](https://github.com/angular-ui/bootstrap/issues/2978))
  * add option to disable animations ([5e661d47](https://github.com/angular-ui/bootstrap/commit/5e661d47d6698fdfebb52402eb1687e5697c0040), closes [#1007](https://github.com/angular-ui/bootstrap/issues/1007), [#2725](https://github.com/angular-ui/bootstrap/issues/2725))
* **popover:**
  * respect popover-class option ([88a41dce](https://github.com/angular-ui/bootstrap/commit/88a41dce86c33bf1e0665d880ca68d3535aed553), closes [#3569](https://github.com/angular-ui/bootstrap/issues/3569))
  * use expression to fix usage with $sce ([422c8234](https://github.com/angular-ui/bootstrap/commit/422c823460663151e3482275d9c6749bb714a415), closes [#3558](https://github.com/angular-ui/bootstrap/issues/3558))
  * add popover-template directive ([7e3179ab](https://github.com/angular-ui/bootstrap/commit/7e3179ab9fdbba6c00ff1c30f97b432b58f9eafb))
* **progressbar:** allow dynamic update to max ([7ccff028](https://github.com/angular-ui/bootstrap/commit/7ccff028ff5ed19af63d9cf1f5e078223924f3a0))
* **rating:** add rounding logic to rating value ([b076483c](https://github.com/angular-ui/bootstrap/commit/b076483caa9b672068ae8d0cbdfeaed68f530861), closes [#3413](https://github.com/angular-ui/bootstrap/issues/3413), [#3415](https://github.com/angular-ui/bootstrap/issues/3415))
* **tabs:** it should not select first not active tab as selected ([91b5fb62](https://github.com/angular-ui/bootstrap/commit/91b5fb62eedbb600d6a6abe32376846f327a903d))
* **timepicker:**
  * always pad minutes ([6324486d](https://github.com/angular-ui/bootstrap/commit/6324486d70edc01fb28f61f0a68a6a490378d602), closes [#1598](https://github.com/angular-ui/bootstrap/issues/1598), [#3533](https://github.com/angular-ui/bootstrap/issues/3533))
  * have up/down arrow keys control time selection ([22961157](https://github.com/angular-ui/bootstrap/commit/22961157ad4636db12336abba54cc893554b99d6))
* **tooltip:**
  * use expression to fix usage with $sce ([d867f830](https://github.com/angular-ui/bootstrap/commit/d867f8302d4632a34c81d151923b497f9af3fcfd), closes [#3558](https://github.com/angular-ui/bootstrap/issues/3558))
  * add tooltip-html directive ([e31fcf0f](https://github.com/angular-ui/bootstrap/commit/e31fcf0fcb06580064d1e6375dbedb69f1c95f25), closes [#3496](https://github.com/angular-ui/bootstrap/issues/3496))
  * add tooltip-template directive ([a1695114](https://github.com/angular-ui/bootstrap/commit/a1695114a245312878d315dfc9e369f98d573eae), closes [#220](https://github.com/angular-ui/bootstrap/issues/220))
  * update position dynamically ([853fa457](https://github.com/angular-ui/bootstrap/commit/853fa4578a1f127fee9283e725d6e19789882121), closes [#96](https://github.com/angular-ui/bootstrap/issues/96), [#1109](https://github.com/angular-ui/bootstrap/issues/1109), [#2816](https://github.com/angular-ui/bootstrap/issues/2816), [#3435](https://github.com/angular-ui/bootstrap/issues/3435))
  * Support for tooltip-class configuration ([d784354a](https://github.com/angular-ui/bootstrap/commit/d784354a53fa40597cb8c124405ea9a90b6f0b8e), closes [#3126](https://github.com/angular-ui/bootstrap/issues/3126))
* **transition:** deprecate transition module ([8a552443](https://github.com/angular-ui/bootstrap/commit/8a552443741d1e5b4b29d9da9c7e9990fa37886c), closes [#3497](https://github.com/angular-ui/bootstrap/issues/3497))


# 0.12.1 (2015-02-20)

## Bug Fixes

- **tooltip:** 
  - incorrect position when text wraps ([5726e3ef](http://github.com/angular-ui/bootstrap/commit/5726e3ef))   

<a name="0.12.0"></a>
# 0.12.0 (2014-11-16)


## Bug Fixes

* **accordion:** make header links keyboard accessible ([992b2329](http://github.com/angular-ui/bootstrap/commit/992b23297cd100ab4e236fba469e3a70566a4163), closes [#2869](http://github.com/angular-ui/bootstrap/issues/2869))
* **build:** make custom builds on demo site work ([390f2bf6](http://github.com/angular-ui/bootstrap/commit/390f2bf6b0846ee640e86ad87bbae8c449e53026), closes [#2960](http://github.com/angular-ui/bootstrap/issues/2960), [#2847](http://github.com/angular-ui/bootstrap/issues/2847), [#2625](http://github.com/angular-ui/bootstrap/issues/2625), [#2489](http://github.com/angular-ui/bootstrap/issues/2489), [#2357](http://github.com/angular-ui/bootstrap/issues/2357), [#2176](http://github.com/angular-ui/bootstrap/issues/2176), [#2892](http://github.com/angular-ui/bootstrap/issues/2892))
* **carousel:** replaced $timeout with $interval when it was wrong ([392c0ad1](http://github.com/angular-ui/bootstrap/commit/392c0ad13ca9b65be5e77ac0c68de24ead8ea2ce), closes [#1308](http://github.com/angular-ui/bootstrap/issues/1308), [#2454](http://github.com/angular-ui/bootstrap/issues/2454), [#2776](http://github.com/angular-ui/bootstrap/issues/2776))
* **datepicker:** correct button alignment when using bootstrap v3.2.0 ([460fbec7](http://github.com/angular-ui/bootstrap/commit/460fbec776c6d08d0e7db40aedd29d10ac48d7e9), closes [#2728](http://github.com/angular-ui/bootstrap/issues/2728))
* **demo:** initial load of fragment URLs ([eab6daf6](http://github.com/angular-ui/bootstrap/commit/eab6daf64b3c963d8e285e254c75af5f97c24ec1), closes [#2762](http://github.com/angular-ui/bootstrap/issues/2762))
* **dropdown:**
  * compatibility with `$location` url rewriting ([ef095170](http://github.com/angular-ui/bootstrap/commit/ef09517061b0b4c0c9e9f85086635af33207ec54), closes [#2343](http://github.com/angular-ui/bootstrap/issues/2343))
  * remove `C` restrictions to avoid conflicts ([192768e1](http://github.com/angular-ui/bootstrap/commit/192768e109b5c4a50c7dcd320e09d05fedd4298a), closes [#2156](http://github.com/angular-ui/bootstrap/issues/2156), [#2170](http://github.com/angular-ui/bootstrap/issues/2170))
* **tabs:**
  * make tab links keyboard accessible ([5df524b7](http://github.com/angular-ui/bootstrap/commit/5df524b77114bccdc9a49540e1eb52a564ee5dfd), closes [#2226](http://github.com/angular-ui/bootstrap/issues/2226), [#2290](http://github.com/angular-ui/bootstrap/issues/2290), [#2870](http://github.com/angular-ui/bootstrap/issues/2870), [#2304](http://github.com/angular-ui/bootstrap/issues/2304))
  * don't select tabs on destroy ([9939867a](http://github.com/angular-ui/bootstrap/commit/9939867aba0b7b763588b18829b557c052ea69ba), closes [#2155](http://github.com/angular-ui/bootstrap/issues/2155), [#2596](http://github.com/angular-ui/bootstrap/issues/2596))
* **tests:** usage of undefined variables ([34273ff0](http://github.com/angular-ui/bootstrap/commit/34273ff0107ecfa28438a7389d94ca619b8704e5))
* **tooltip:**
  * remove extra digest causing incompatibility ([32c4704b](http://github.com/angular-ui/bootstrap/commit/32c4704b748cecf2de4c651f2e5157c1ef6c88b1), closes [#2951](http://github.com/angular-ui/bootstrap/issues/2951), [#2959](http://github.com/angular-ui/bootstrap/issues/2959))
  * show correct tooltip on `ng-repeat` ([b4832c4b](http://github.com/angular-ui/bootstrap/commit/b4832c4b551af7e580ed65d9e5aaee1ef9e6c53e), closes [#2935](http://github.com/angular-ui/bootstrap/issues/2935))
  * memory leak on show/hide ([faf38d20](http://github.com/angular-ui/bootstrap/commit/faf38d20a49176f2016f7f7d4fa49a5c438a986e), closes [#2709](http://github.com/angular-ui/bootstrap/issues/2709), [#2919](http://github.com/angular-ui/bootstrap/issues/2919))
  * remove child scope requirement ([8204c808](http://github.com/angular-ui/bootstrap/commit/8204c8088139165ac9b2ad3977a2c20570e434cb), closes [#1269](http://github.com/angular-ui/bootstrap/issues/1269), [#2320](http://github.com/angular-ui/bootstrap/issues/2320), [#2203](http://github.com/angular-ui/bootstrap/issues/2203))
  * evaluate appendToBody on init ([e10d561f](http://github.com/angular-ui/bootstrap/commit/e10d561f92c2927be0ec429761fa229520fb9a51), closes [#2921](http://github.com/angular-ui/bootstrap/issues/2921))
  * don't use an empty transclusion fn ([689c4d01](http://github.com/angular-ui/bootstrap/commit/689c4d017d303b6d758164ee12837a172bb01139), closes [#2825](http://github.com/angular-ui/bootstrap/issues/2825))
* **typeahead:** don't leak DOM nodes ([1f6c3c92](http://github.com/angular-ui/bootstrap/commit/1f6c3c92af0e343c7e34b85ea6d270ac79bf6755))


## Features

* **alert:** allow alerts to be closed from a controller ([ca6fad67](http://github.com/angular-ui/bootstrap/commit/ca6fad675bf2aa793896bf3e086330667a5d9051), closes [#2399](http://github.com/angular-ui/bootstrap/issues/2399), [#2854](http://github.com/angular-ui/bootstrap/issues/2854))
* **typeahead:** add focus-first option ([35d0cc1d](http://github.com/angular-ui/bootstrap/commit/35d0cc1d57302883840f7ad54a03918ae2df001d), closes [#908](http://github.com/angular-ui/bootstrap/issues/908), [#2916](http://github.com/angular-ui/bootstrap/issues/2916))


## Breaking Changes

* `tooltip-trigger` and `popover-trigger` are no longer watched
attributes.
([a65bea95](http://github.com/angular-ui/bootstrap/commit/a65bea95338802b026fd213805b095b5a0b5b393))  
This affects both popovers and tooltips. The *triggers are now set up
once* and can no longer be changed after initialization.

* `dropdown` and `dropdown-toggle` are attribute-only directives. ([192768e1](http://github.com/angular-ui/bootstrap/commit/192768e109b5c4a50c7dcd320e09d05fedd4298a))

  Before:
    ```html
    <button class="dropdown-toggle" ...>
    ```
    After:
    ```html
    <button class="dropdown-toggle" dropdown-toggle ...>
    ```


# 0.11.2 (2014-09-26)

Revert breaking change in **dropdown** ([1a998c4](http://github.com/angular-ui/bootstrap/commit/1a998c4))

# 0.11.1 (2014-09-26)

## Features

- **modal:** 
  - add backdropClass option, similar to windowClass option ([353e6127](http://github.com/angular-ui/bootstrap/commit/353e6127))  
  - support alternative controllerAs syntax ([8d7c2a26](http://github.com/angular-ui/bootstrap/commit/8d7c2a26))  
  - allow templateUrl to be a function ([990015fb](http://github.com/angular-ui/bootstrap/commit/990015fb))   

## Bug Fixes

- **alert:** 
  - correct binding of alert type class ([aa188aec](http://github.com/angular-ui/bootstrap/commit/aa188aec))  
- **dateparser:** 
  - do not parse if no format specified ([42cc3f26](http://github.com/angular-ui/bootstrap/commit/42cc3f26))  
- **datepicker:** 
  - correct `datepicker-mode` binding for popup ([63ae06c9](http://github.com/angular-ui/bootstrap/commit/63ae06c9))  
  - memory leak fix for datepicker ([08c150e1](http://github.com/angular-ui/bootstrap/commit/08c150e1))  
- **dropdown:** 
  - close after selecting an item ([3ac3b487](http://github.com/angular-ui/bootstrap/commit/3ac3b487))  
  - remove `C` restrictions to avoid conflicts ([7512b93f](http://github.com/angular-ui/bootstrap/commit/7512b93f))  
- **modal:** 
  - allow modal.{dismiss,close} to be called again ([1590920c](http://github.com/angular-ui/bootstrap/commit/1590920c))  
  - add a work-around for transclusion scope ([0b31e865](http://github.com/angular-ui/bootstrap/commit/0b31e865))  
  - allow in-lined controller-as controllers ([79105368](http://github.com/angular-ui/bootstrap/commit/79105368))  
  - respect autofocus on child elements ([e62ab94a](http://github.com/angular-ui/bootstrap/commit/e62ab94a))  
  - controllerAs not checked ([7b7cdf84](http://github.com/angular-ui/bootstrap/commit/7b7cdf84))  
- **tabs:** 
  - remove leading newline from a template ([a708fe6d](http://github.com/angular-ui/bootstrap/commit/a708fe6d))  
- **typeahead:** 
  - timeout cancellation when deleting characters ([5dc57927](http://github.com/angular-ui/bootstrap/commit/5dc57927))  
  - allow multiple line expression ([c7db0df4](http://github.com/angular-ui/bootstrap/commit/c7db0df4))  
  - replace ng-if with ng-show in matches popup ([a0be450d](http://github.com/angular-ui/bootstrap/commit/a0be450d))   

# 0.11.0 (2014-05-01)

## Features

- **accordion:** 
  - support `is-disabled` state ([9c43ae7c](http://github.com/angular-ui/bootstrap/commit/9c43ae7c))  
- **alert:** 
  - add WAI-ARIA markup ([9a2638bf](http://github.com/angular-ui/bootstrap/commit/9a2638bf))  
- **button:** 
  - allow uncheckable radio button ([82df4fb1](http://github.com/angular-ui/bootstrap/commit/82df4fb1))  
- **carousel:** 
  - Support swipe for touchscreen devices ([85140f84](http://github.com/angular-ui/bootstrap/commit/85140f84))  
- **dateParser:** 
  - add `dateParser` service ([bd2ae0ee](http://github.com/angular-ui/bootstrap/commit/bd2ae0ee))  
- **datepicker:** 
  - add `datepicker-mode`, `init-date` & today hint ([7f4b40eb](http://github.com/angular-ui/bootstrap/commit/7f4b40eb))  
  - make widget accessible ([2423f6d4](http://github.com/angular-ui/bootstrap/commit/2423f6d4))  
  - full six-week calendar ([b0b14343](http://github.com/angular-ui/bootstrap/commit/b0b14343))  
- **dropdown:** 
  - add WAI-ARIA attributes ([22ebd230](http://github.com/angular-ui/bootstrap/commit/22ebd230))  
  - focus toggle element when opening or closing with Esc` ([f715d052](http://github.com/angular-ui/bootstrap/commit/f715d052))  
- **dropdownToggle:** 
  - support programmatic trigger & toggle callback ([ae31079c](http://github.com/angular-ui/bootstrap/commit/ae31079c))  
  - add support for `escape` key ([1417c548](http://github.com/angular-ui/bootstrap/commit/1417c548))  
- **modal:** 
  - support custom template for modal window ([96def3d6](http://github.com/angular-ui/bootstrap/commit/96def3d6))  
  - support modal window sizes ([976f6083](http://github.com/angular-ui/bootstrap/commit/976f6083))  
  - improve accessibility - add role='dialog' ([60cee9dc](http://github.com/angular-ui/bootstrap/commit/60cee9dc))  
- **pagination:** 
  - plug into `ngModel` controller ([d65901cf](http://github.com/angular-ui/bootstrap/commit/d65901cf))  
- **progressbar:** 
  - make widget accessible ([9dfe3157](http://github.com/angular-ui/bootstrap/commit/9dfe3157))  
- **rating:** 
  - plug into `ngModel` controller ([47e227f6](http://github.com/angular-ui/bootstrap/commit/47e227f6))  
  - make widget accessible ([4f56e60e](http://github.com/angular-ui/bootstrap/commit/4f56e60e))  
- **tooltip:** 
  - support more positioning options ([3704db9a](http://github.com/angular-ui/bootstrap/commit/3704db9a))  
- **typeahead:** 
  - add WAI-ARIA markup ([5ca23e97](http://github.com/angular-ui/bootstrap/commit/5ca23e97))  
  - add `aria-owns` & `aria-activedescendant` roles ([4c76a858](http://github.com/angular-ui/bootstrap/commit/4c76a858))   

## Bug Fixes

- **alert:** 
  - use interpolation for type attribute ([f0a129ad](http://github.com/angular-ui/bootstrap/commit/f0a129ad))  
  - add `alert-dismissable` class ([794954af](http://github.com/angular-ui/bootstrap/commit/794954af))  
- **carousel:** 
  - correct glyphicon ([3b6ab25b](http://github.com/angular-ui/bootstrap/commit/3b6ab25b))  
- **datepicker:** 
  - remove unneeded date creation ([68cb2e5a](http://github.com/angular-ui/bootstrap/commit/68cb2e5a))  
  - `Today` button should not set time ([e1993491](http://github.com/angular-ui/bootstrap/commit/e1993491))  
  - mark input field as invalid if the date is invalid ([467dd159](http://github.com/angular-ui/bootstrap/commit/467dd159))  
  - rename `dateFormat` to `datepickerPopup` in datepickerPopupConfig ([93da30d5](http://github.com/angular-ui/bootstrap/commit/93da30d5))  
  - parse input using dateParser ([e0eb1bce](http://github.com/angular-ui/bootstrap/commit/e0eb1bce))  
- **dropdown:**
  - use $animate for adding and removing classes ([e8d5fefc](http://github.com/angular-ui/bootstrap/commit/e8d5fefc))  
  - unbind toggle element event on scope destroy ([890e2d37](http://github.com/angular-ui/bootstrap/commit/890e2d37))  
  - do not call `on-toggle` initially ([004dd1de](http://github.com/angular-ui/bootstrap/commit/004dd1de))  
  - ensure `on-toggle` works when `is-open` is not used ([06ad3bd5](http://github.com/angular-ui/bootstrap/commit/06ad3bd5))  
- **modal:**
  - destroy modal scope after animation end ([dfc36fd9](http://github.com/angular-ui/bootstrap/commit/dfc36fd9))  
  - backdrop z-index when stacking modals ([94a7f593](http://github.com/angular-ui/bootstrap/commit/94a7f593))  
  - give a reason of rejection when escape key pressed ([cb31b875](http://github.com/angular-ui/bootstrap/commit/cb31b875))  
  - prevent default event when closing via escape key ([da951222](http://github.com/angular-ui/bootstrap/commit/da951222))
  - toggle 'modal-open' class after animation ([4d641ca7](http://github.com/angular-ui/bootstrap/commit/4d641ca7))
- **pagination:** 
  - take maxSize defaults into account ([a294c87f](http://github.com/angular-ui/bootstrap/commit/a294c87f))  
- **position:** 
  - remove deprecated body scrollTop and scrollLeft ([1ba07c1b](http://github.com/angular-ui/bootstrap/commit/1ba07c1b))  
- **progressbar:** 
  - allow fractional values for bar width ([0daa7a74](http://github.com/angular-ui/bootstrap/commit/0daa7a74))  
  - number filter in bar template and only for percent ([378a9337](http://github.com/angular-ui/bootstrap/commit/378a9337))  
- **tabs:** 
  - fire deselect before select callback ([7474c47b](http://github.com/angular-ui/bootstrap/commit/7474c47b))  
  - use interpolation for type attribute ([83ceb78a](http://github.com/angular-ui/bootstrap/commit/83ceb78a))  
  - remove `tabbable` class required for left/right tabs ([19468331](http://github.com/angular-ui/bootstrap/commit/19468331))  
- **timepicker:** 
  - evaluate correctly the `readonly-input` attribute ([f9b6c496](http://github.com/angular-ui/bootstrap/commit/f9b6c496))  
- **tooltip:** 
  - animation causes tooltip to hide on show ([2b429f5d](http://github.com/angular-ui/bootstrap/commit/2b429f5d))  
- **typeahead:** 
  - correctly handle append to body attribute ([10785736](http://github.com/angular-ui/bootstrap/commit/10785736))  
  - correctly higlight numeric matches ([09678b12](http://github.com/angular-ui/bootstrap/commit/09678b12))  
  - loading callback updates after blur ([6a830116](http://github.com/angular-ui/bootstrap/commit/6a830116))  
  - incompatibility with ng-focus ([d0024931](http://github.com/angular-ui/bootstrap/commit/d0024931))   

## Breaking Changes

- **alert:** 
 Use interpolation for type attribute.

  Before:

  ```html
  <alert type="'info'" ...></alert >
  ```
  or
  ```html
  <alert type="alert.type" ...></alert >
  ```

  After:

  ```html
  <alert type="info" ...></alert >
  ```
  or
  ```html
  <alert type="{{alert.type}}" ...></alert >
  ```

- **datepicker:** 

`show-weeks` is no longer a watched attribute
`*-format` attributes have been renamed to `format-*`
`min` attribute has been renamed to `min-date`
`max` attribute has been renamed to `max-date`
`Open on focus` has been removed. Read more on this ([comment](https://github.com/angular-ui/bootstrap/pull/1922#issuecomment-40491716)). 

- **dropdown:**

 Elements with the `dropdown-toggle` directive must have a parent element with the `dropdown` directive.

- **pagination:**

 Both `pagination` and `pager` are now integrated with `ngModelController`.
 * `page` is replaced from `ng-model`.
 * `on-select-page` is removed since `ng-change` can now be used.

  Before:
  
  ```html
  <pagination page="current" on-select-page="changed(page)" ...></pagination>
  ```
  
  After:

  ```html
  <pagination ng-model="current" ng-change="changed()" ...></pagination>
  ```
  
- **rating:** 
 `rating` is now integrated with `ngModelController`.
 * `value` is replaced from `ng-model`.

  Before:

  ```html
  <rating value="rate" ...></rating>
  ```
  
  After:
  
  ```html
  <rating ng-model="rate" ...></rating>
  ```
  
- **tabs:**

 Use interpolation for type attribute.

  Before:
  
  ```html
  <tabset type="'pills'" ...></tabset >
  <!-- or -->
  <tabset type="navtype" ...></tabset>
  ```
  
  After:
  
  ```html
  <tabset type="pills" ...></tabset>
  <!-- or -->
  <tabset type="{{navtype}}" ...></tabset>
  ```
  
# 0.10.0 (2014-01-13)

_This release adds AngularJS 1.2 support_

## Features

- **modal:** 
  - expose dismissAll on $modalStack ([bc8d21c1](http://github.com/angular-ui/bootstrap/commit/bc8d21c1))   

## Bug Fixes

- **datepicker:** 
  - evaluate `show-weeks` from `datepicker-options` ([92c1715f](http://github.com/angular-ui/bootstrap/commit/92c1715f))  
- **modal:** 
  - leaking watchers due to scope re-use ([0754ad7b](http://github.com/angular-ui/bootstrap/commit/0754ad7b))  
  - support close animation ([1933488c](http://github.com/angular-ui/bootstrap/commit/1933488c))  
- **timepicker:** 
  - add correct type for meridian button ([bcf39efe](http://github.com/angular-ui/bootstrap/commit/bcf39efe))  
- **tooltip:** 
  - performance and scope fixes ([c0df3201](http://github.com/angular-ui/bootstrap/commit/c0df3201))   

# 0.9.0 (2013-12-28)

_This release adds Bootstrap3 support_

## Features

- **accordion:** 
  - convert to bootstrap3 panel styling ([458a9bd3](http://github.com/angular-ui/bootstrap/commit/458a9bd3))  
- **carousel:** 
  - some changes for Bootstrap3 ([1f632b65](http://github.com/angular-ui/bootstrap/commit/1f632b65))  
- **collapse:** 
  - make collapse work with bootstrap3 ([517dff6e](http://github.com/angular-ui/bootstrap/commit/517dff6e))  
- **datepicker:** 
  - update to Bootstrap 3 ([37684330](http://github.com/angular-ui/bootstrap/commit/37684330))  
- **modal:** 
  - added bootstrap3 support ([444c488d](http://github.com/angular-ui/bootstrap/commit/444c488d))  
- **pagination:** 
  - support bootstrap3 ([3db699d7](http://github.com/angular-ui/bootstrap/commit/3db699d7))  
- **progressbar:** 
  - update to bootstrap3 ([5bcff623](http://github.com/angular-ui/bootstrap/commit/5bcff623))  
- **rating:** 
  - update rating to bootstrap3 ([7e60284e](http://github.com/angular-ui/bootstrap/commit/7e60284e))  
- **tabs:** 
  - add nav-justified ([3199dd88](http://github.com/angular-ui/bootstrap/commit/3199dd88))  
- **timepicker:** 
  - restyled for bootstrap 3 ([6724a721](http://github.com/angular-ui/bootstrap/commit/6724a721))  
- **typeahead:** 
  - update to Bootstrap 3 ([eadf934a](http://github.com/angular-ui/bootstrap/commit/eadf934a))   

## Bug Fixes

- **alert:** 
  - update template to Bootstrap 3 ([dfc3b0bd](http://github.com/angular-ui/bootstrap/commit/dfc3b0bd))  
- **collapse:** 
  - Prevent consecutive transitions & tidy up code ([b0032d68](http://github.com/angular-ui/bootstrap/commit/b0032d68))  
  - fixes after rebase ([dc02ad1d](http://github.com/angular-ui/bootstrap/commit/dc02ad1d))  
- **rating:** 
  - user glyhicon classes ([d221d517](http://github.com/angular-ui/bootstrap/commit/d221d517))  
- **timepicker:** 
  - fix look with bootstrap3 ([9613b61b](http://github.com/angular-ui/bootstrap/commit/9613b61b))  
- **tooltip:** 
  - re-position tooltip after draw ([a99b3608](http://github.com/angular-ui/bootstrap/commit/a99b3608))   

# 0.8.0 (2013-12-28)

## Features

- **datepicker:** 
  - option whether to display button bar in popup ([4d158e0d](http://github.com/angular-ui/bootstrap/commit/4d158e0d))  
- **modal:** 
  - add modal-open class to body on modal open ([e76512fa](http://github.com/angular-ui/bootstrap/commit/e76512fa))  
- **progressbar:** 
  - add `max` attribute & support transclusion ([365573ab](http://github.com/angular-ui/bootstrap/commit/365573ab))  
- **timepicker:** 
  - default meridian labels based on locale ([8b1ab79a](http://github.com/angular-ui/bootstrap/commit/8b1ab79a))  
- **typeahead:** 
  - add typeahead-append-to-body option ([dd8eac22](http://github.com/angular-ui/bootstrap/commit/dd8eac22))   

## Bug Fixes

- **accordion:** 
  - correct `is-open` handling for dynamic groups ([9ec21286](http://github.com/angular-ui/bootstrap/commit/9ec21286))  
- **carousel:** 
  - cancel timer on scope destruction ([5b9d929c](http://github.com/angular-ui/bootstrap/commit/5b9d929c))  
  - cancel goNext on scope destruction ([7515df45](http://github.com/angular-ui/bootstrap/commit/7515df45))  
- **collapse:** 
  - dont animate height changes from 0 to 0 ([81e014a8](http://github.com/angular-ui/bootstrap/commit/81e014a8))  
- **datepicker:** 
  - set default zero time after no date selected ([93cd0df8](http://github.com/angular-ui/bootstrap/commit/93cd0df8))  
  - fire `ngChange` on today/clear button press ([6b1c68fb](http://github.com/angular-ui/bootstrap/commit/6b1c68fb))  
  - remove datepicker's popup on scope destroy ([48955d69](http://github.com/angular-ui/bootstrap/commit/48955d69))  
  - remove edge case position updates ([1fbcb5d6](http://github.com/angular-ui/bootstrap/commit/1fbcb5d6))  
- **modal:** 
  - put backdrop in before window ([d64f4a97](http://github.com/angular-ui/bootstrap/commit/d64f4a97))  
  - grab reference to body when it is needed in lieu of when the factory is created ([dd415a98](http://github.com/angular-ui/bootstrap/commit/dd415a98))
  - focus freshly opened modal ([709e679c](http://github.com/angular-ui/bootstrap/commit/709e679c))  
  - properly animate backdrops on each modal opening ([672a557a](http://github.com/angular-ui/bootstrap/commit/672a557a))  
- **tabs:** 
  - make nested tabs work ([c9acebbe](http://github.com/angular-ui/bootstrap/commit/c9acebbe))  
- **tooltip:** 
  - update tooltip content when empty ([60515ae1](http://github.com/angular-ui/bootstrap/commit/60515ae1))  
  - support IE8 ([5dd98238](http://github.com/angular-ui/bootstrap/commit/5dd98238))  
  - unbind element events on scope destroy ([3fe7aa8c](http://github.com/angular-ui/bootstrap/commit/3fe7aa8c))  
  - respect animate attribute ([54e614a8](http://github.com/angular-ui/bootstrap/commit/54e614a8))   

## Breaking Changes

- **progressbar:** 
 The onFull/onEmpty handlers & auto/stacked types have been removed.

  To migrate your code change your markup like below.

  Before:

```html
  <progress percent="var" class="progress-warning"></progress>
```

  After:

```html
  <progressbar value="var" type="warning"></progressbar>
```

  and for stacked instead of passing array/objects you can do:

```html
  <progress><bar ng-repeat="obj in objs" value="obj.var" type="{{obj.type}}"></bar></progress>
```

# 0.7.0 (2013-11-22)

## Features

- **datepicker:** 
  - add i18n support for bar buttons in popup ([c6ba8d7f](http://github.com/angular-ui/bootstrap/commit/c6ba8d7f))  
  - dynamic date format for popup ([aa3eaa91](http://github.com/angular-ui/bootstrap/commit/aa3eaa91))  
  - datepicker-append-to-body attribute ([0cdc4609](http://github.com/angular-ui/bootstrap/commit/0cdc4609))  
- **dropdownToggle:** 
  - disable dropdown when it has the disabled class ([104bdd1b](http://github.com/angular-ui/bootstrap/commit/104bdd1b))  
- **tooltip:** 
  - add ability to enable / disable tooltip ([5d9bd058](http://github.com/angular-ui/bootstrap/commit/5d9bd058))   

## Bug Fixes

- **accordion:** 
  - assign `is-open` to correct scope ([157f614a](http://github.com/angular-ui/bootstrap/commit/157f614a))  
- **collapse:** 
  - remove element height watching ([a72c635c](http://github.com/angular-ui/bootstrap/commit/a72c635c))  
  - add the "in" class for expanded panels ([9eca35a8](http://github.com/angular-ui/bootstrap/commit/9eca35a8))  
- **datepicker:**
  - some IE8 compatibility improvements ([4540476f](http://github.com/angular-ui/bootstrap/commit/4540476f))  
  - set popup initial position in append-to-body case ([78a1e9d7](http://github.com/angular-ui/bootstrap/commit/78a1e9d7))
  - properly handle showWeeks config option ([570dba90](http://github.com/angular-ui/bootstrap/commit/570dba90))  
- **modal:** 
  - correctly close modals with no backdrop ([e55c2de3](http://github.com/angular-ui/bootstrap/commit/e55c2de3))  
- **pagination:** 
  - fix altering of current page caused by totals change ([81164dae](http://github.com/angular-ui/bootstrap/commit/81164dae))  
  - handle extreme values for `total-items` ([8ecf93ed](http://github.com/angular-ui/bootstrap/commit/8ecf93ed))  
- **position:** 
  - correct positioning for SVG elements ([968e5407](http://github.com/angular-ui/bootstrap/commit/968e5407))  
- **tabs:** 
  - initial tab selection ([a08173ec](http://github.com/angular-ui/bootstrap/commit/a08173ec))  
- **timepicker:** 
  - use html5 for input elements ([53709f0f](http://github.com/angular-ui/bootstrap/commit/53709f0f))  
- **tooltip:** 
  - restore html-unsafe compatibility with AngularJS 1.2 ([08d8b21d](http://github.com/angular-ui/bootstrap/commit/08d8b21d))  
  - hide tooltips when content becomes empty ([cf5c27ae](http://github.com/angular-ui/bootstrap/commit/cf5c27ae))  
  - tackle DOM node and event handlers leak ([0d810acd](http://github.com/angular-ui/bootstrap/commit/0d810acd))  
- **typeahead:** 
  - do not set editable error when input is empty ([006986db](http://github.com/angular-ui/bootstrap/commit/006986db))  
  - remove popup flickering ([dde804b6](http://github.com/angular-ui/bootstrap/commit/dde804b6))  
  - don't show matches if an element is not focused ([d1f94530](http://github.com/angular-ui/bootstrap/commit/d1f94530))  
  - fix loading callback when deleting characters ([0149eff6](http://github.com/angular-ui/bootstrap/commit/0149eff6))  
  - prevent accidental form submission on ENTER ([253c49ff](http://github.com/angular-ui/bootstrap/commit/253c49ff))  
  - evaluate matches source against a correct scope ([fd21214d](http://github.com/angular-ui/bootstrap/commit/fd21214d))  
  - support IE8 ([0e9f9980](http://github.com/angular-ui/bootstrap/commit/0e9f9980))   

# 0.6.0 (2013-09-08)

## Features

- **modal:** 
  - rewrite $dialog as $modal ([d7a48523](http://github.com/angular-ui/bootstrap/commit/d7a48523))  
  - add support for custom window settings ([015625d1](http://github.com/angular-ui/bootstrap/commit/015625d1))  
  - expose $close and $dismiss options on modal's scope ([8d153acb](http://github.com/angular-ui/bootstrap/commit/8d153acb))  
- **pagination:** 
  - `total-items` & optional `items-per-page` API ([e55d9063](http://github.com/angular-ui/bootstrap/commit/e55d9063))  
- **rating:** 
  - add support for custom icons per instance ([20ab01ad](http://github.com/angular-ui/bootstrap/commit/20ab01ad))  
- **timepicker:** 
  - plug into `ngModel` controller ([b08e993f](http://github.com/angular-ui/bootstrap/commit/b08e993f))   

## Bug Fixes

- **carousel:** 
  - correct reflow triggering on FFox and Safari ([d34f2de1](http://github.com/angular-ui/bootstrap/commit/d34f2de1))  
- **datepicker:** 
  - correctly manage focus without jQuery present ([d474824b](http://github.com/angular-ui/bootstrap/commit/d474824b))  
  - compatibility with angular 1.1.5 and no jquery ([bf30898d](http://github.com/angular-ui/bootstrap/commit/bf30898d))  
  - use $setViewValue for inner changes ([dd99f35d](http://github.com/angular-ui/bootstrap/commit/dd99f35d))
- **modal:**
  - insert backdrop before modal window ([d870f212](http://github.com/angular-ui/bootstrap/commit/d870f212))
  - ie8 fix after $modal rewrite ([ff9d969e](http://github.com/angular-ui/bootstrap/commit/ff9d969e))
  - opening a modal should not change default options ([82532d1b](http://github.com/angular-ui/bootstrap/commit/82532d1b))
  - backdrop should cover previously opened modals ([7fce2fe8](http://github.com/angular-ui/bootstrap/commit/7fce2fe8))
  - allow replacing object with default options ([8e7fbf06](http://github.com/angular-ui/bootstrap/commit/8e7fbf06))
- **position:**
  - fallback for IE8's scrollTop/Left for offset ([9aecd4ed](http://github.com/angular-ui/bootstrap/commit/9aecd4ed))  
- **tabs:** 
  - add DI array-style annotations ([aac4a0dd](http://github.com/angular-ui/bootstrap/commit/aac4a0dd))  
  - evaluate `vertical` on parent scope ([9af6f96e](http://github.com/angular-ui/bootstrap/commit/9af6f96e))  
- **timepicker:** 
  - add type attribute for meridian button ([1f89fd4b](http://github.com/angular-ui/bootstrap/commit/1f89fd4b))  
- **tooltip:** 
  - remove placement='mouse' option ([17163c22](http://github.com/angular-ui/bootstrap/commit/17163c22))  
- **typeahead:** 
  - fix label rendering for equal model and items names ([5de71216](http://github.com/angular-ui/bootstrap/commit/5de71216))  
  - set validity flag for non-editable inputs ([366e0c8a](http://github.com/angular-ui/bootstrap/commit/366e0c8a))  
  - plug in front of existing parsers ([80cef614](http://github.com/angular-ui/bootstrap/commit/80cef614))  
  - highlight return match if no query ([45dd9be1](http://github.com/angular-ui/bootstrap/commit/45dd9be1))  
  - keep pop-up on clicking input ([5f9e270d](http://github.com/angular-ui/bootstrap/commit/5f9e270d))  
  - remove dependency on ng-bind-html-unsafe ([75893393](http://github.com/angular-ui/bootstrap/commit/75893393))   

## Breaking Changes

- **modal:**

* `$dialog` service was refactored into `$modal`
* `modal` directive was removed - use the `$modal` service instead

Check the documentation for the `$modal` service to migrate from `$dialog`

- **pagination:** 
 API has undergone some changes in order to be easier to use.
 * `current-page` is replaced from `page`.
 * Number of pages is not defined by `num-pages`, but from `total-items` &
  `items-per-page` instead. If `items-per-page` is missing, default is 10.
 * `num-pages` still exists but is just readonly.

  Before:

```html
  <pagination num-pages="10" ...></pagination>
```

  After:

```html
  <pagination total-items="100" ...></pagination>
```

- **tooltip:** 


The placment='mouse' is gone with no equivalent
 
# 0.5.0 (2013-08-04)

## Features

- **buttons:** 
  - support dynamic true / false values in btn-checkbox ([3e30cd94](http://github.com/angular-ui/bootstrap/commit/3e30cd94))  
- **datepicker:** 
  - `ngModelController` plug & new `datepickerPopup` ([dab18336](http://github.com/angular-ui/bootstrap/commit/dab18336))  
- **rating:** 
  - added onHover and onLeave. ([5b1115e3](http://github.com/angular-ui/bootstrap/commit/5b1115e3))  
- **tabs:** 
  - added onDeselect callback, used similarly as onSelect ([fe47c9bb](http://github.com/angular-ui/bootstrap/commit/fe47c9bb))  
  - add the ability to set the direction of the tabs ([220e7b60](http://github.com/angular-ui/bootstrap/commit/220e7b60))  
- **typeahead:** 
  - support custom templates for matched items ([e2238174](http://github.com/angular-ui/bootstrap/commit/e2238174))  
  - expose index to custom templates ([5ffae83d](http://github.com/angular-ui/bootstrap/commit/5ffae83d))   

## Bug Fixes

- **datepicker:** 
  - handle correctly `min`/`max` when cleared ([566bdd16](http://github.com/angular-ui/bootstrap/commit/566bdd16))  
  - add type attribute for buttons ([25caf5fb](http://github.com/angular-ui/bootstrap/commit/25caf5fb))  
- **pagination:** 
  - handle `currentPage` number as string ([b1fa7bb8](http://github.com/angular-ui/bootstrap/commit/b1fa7bb8))  
  - use interpolation for text attributes ([f45815cb](http://github.com/angular-ui/bootstrap/commit/f45815cb))  
- **popover:** 
  - don't unbind event handlers created by other directives ([56f624a2](http://github.com/angular-ui/bootstrap/commit/56f624a2))  
  - correctly position popovers appended to body ([93a82af0](http://github.com/angular-ui/bootstrap/commit/93a82af0))  
- **rating:** 
  - evaluate `max` attribute on parent scope ([60619d51](http://github.com/angular-ui/bootstrap/commit/60619d51))  
- **tabs:** 
  - make tab contents be correctly connected to parent (#524) ([be7ecff0](http://github.com/angular-ui/bootstrap/commit/be7ecff0))  
  - Make tabset template correctly use tabset attributes (#584) ([8868f236](http://github.com/angular-ui/bootstrap/commit/8868f236))  
  - fix tab content compiling wrong (Closes #599, #631, #574) ([224bc2f5](http://github.com/angular-ui/bootstrap/commit/224bc2f5))  
  - make tabs added with active=true be selected ([360cd5ca](http://github.com/angular-ui/bootstrap/commit/360cd5ca))  
  - if tab is active at start, always select it ([ba1f741d](http://github.com/angular-ui/bootstrap/commit/ba1f741d))  
- **timepicker:** 
  - prevent date change ([ee741707](http://github.com/angular-ui/bootstrap/commit/ee741707))  
  - added wheel event to enable mousewheel on Firefox ([8dc92afa](http://github.com/angular-ui/bootstrap/commit/8dc92afa))  
- **tooltip:** 
  - fix positioning inside scrolling element ([63ae7e12](http://github.com/angular-ui/bootstrap/commit/63ae7e12))  
  - triggers should be local to tooltip instances ([58e8ef4f](http://github.com/angular-ui/bootstrap/commit/58e8ef4f))  
  - correctly handle initial events unbinding ([4fd5bf43](http://github.com/angular-ui/bootstrap/commit/4fd5bf43))  
  - bind correct 'hide' event handler ([d50b0547](http://github.com/angular-ui/bootstrap/commit/d50b0547))  
- **typeahead:** 
  - play nicelly with existing formatters ([d2df0b35](http://github.com/angular-ui/bootstrap/commit/d2df0b35))  
  - properly render initial input value ([c4e169cb](http://github.com/angular-ui/bootstrap/commit/c4e169cb))  
  - separate text field rendering and drop down rendering ([ea1e858a](http://github.com/angular-ui/bootstrap/commit/ea1e858a))  
  - fixed waitTime functionality ([90a8aa79](http://github.com/angular-ui/bootstrap/commit/90a8aa79))  
  - correctly close popup on match selection ([624fd5f5](http://github.com/angular-ui/bootstrap/commit/624fd5f5))   

## Breaking Changes

- **pagination:** 
 The 'first-text', 'previous-text', 'next-text' and 'last-text'
  attributes are now interpolated.

  To migrate your code, remove quotes for constant attributes and/or
  interpolate scope variables.

  Before:

```html
  <pagination first-text="'<<'" ...></pagination>
```
  and/or

```html
  $scope.var1 = '<<';
  <pagination first-text="var1" ...></pagination>
```
  After:

```html
  <pagination first-text="<<" ...></pagination>
```
  and/or

```html
  $scope.var1 = '<<';
  <pagination first-text="{{var1}}" ...></pagination>
```

# 0.4.0 (2013-06-24)

## Features

- **buttons:** 
  - support dynamic values in btn-radio ([e8c5b548](http://github.com/angular-ui/bootstrap/commit/e8c5b548))  
- **carousel:** 
  - add option to prevent pause ([5f895c13](http://github.com/angular-ui/bootstrap/commit/5f895c13))  
- **datepicker:** 
  - add datepicker directive ([30a00a07](http://github.com/angular-ui/bootstrap/commit/30a00a07))  
- **pagination:** 
  - option for different mode when maxSize ([a023d082](http://github.com/angular-ui/bootstrap/commit/a023d082))  
  - add pager directive ([d9526475](http://github.com/angular-ui/bootstrap/commit/d9526475))  
- **tabs:** 
  - Change directive name, add features ([c5326595](http://github.com/angular-ui/bootstrap/commit/c5326595))  
  - support disabled state ([2b78dd16](http://github.com/angular-ui/bootstrap/commit/2b78dd16))  
  - add support for vertical option ([88d17a75](http://github.com/angular-ui/bootstrap/commit/88d17a75))  
  - add support for other navigation types, like 'pills' ([53e0a39f](http://github.com/angular-ui/bootstrap/commit/53e0a39f))  
- **timepicker:** 
  - add timepicker directive ([9bc5207b](http://github.com/angular-ui/bootstrap/commit/9bc5207b))  
- **tooltip:** 
  - add mouse placement option ([ace7bc60](http://github.com/angular-ui/bootstrap/commit/ace7bc60))
  - add *-append-to-body attribute ([d0896263](http://github.com/angular-ui/bootstrap/commit/d0896263))  
  - add custom trigger support ([dfa53155](http://github.com/angular-ui/bootstrap/commit/dfa53155))  
- **typeahead:** 
  - support typeahead-on-select callback ([91ac17c9](http://github.com/angular-ui/bootstrap/commit/91ac17c9))  
  - support wait-ms option ([7f35a3f2](http://github.com/angular-ui/bootstrap/commit/7f35a3f2))   

## Bug Fixes

- **accordion:** 
  - allow accordion heading directives as attributes. ([25f6e55c](http://github.com/angular-ui/bootstrap/commit/25f6e55c))
- **carousel:** 
  - do not allow user to change slide if transitioning ([1d19663f](http://github.com/angular-ui/bootstrap/commit/1d19663f))  
  - make slide 'active' binding optional ([17d6c3b5](http://github.com/angular-ui/bootstrap/commit/17d6c3b5))  
  - fix error with deleting multiple slides at once ([3fcb70f0](http://github.com/angular-ui/bootstrap/commit/3fcb70f0))  
- **dialog:** 
  - remove dialogOpenClass to get in line with v2.3 ([f009b23f](http://github.com/angular-ui/bootstrap/commit/f009b23f))  
- **pagination:** 
  - bind *-text attributes ([e1bff6b7](http://github.com/angular-ui/bootstrap/commit/e1bff6b7))  
- **progressbar:** 
  - user `percent` attribute instead of `value`. ([58efec80](http://github.com/angular-ui/bootstrap/commit/58efec80))  
- **tooltip:** 
  - fix positioning error when appendToBody is set to true ([76fee1f9](http://github.com/angular-ui/bootstrap/commit/76fee1f9))  
  - close tooltips appended to body on location change ([041261b5](http://github.com/angular-ui/bootstrap/commit/041261b5))  
  - tooltips will hide on scope.$destroy ([3e5a58e5](http://github.com/angular-ui/bootstrap/commit/3e5a58e5))  
  - support of custom $interpolate.startSymbol ([88c94ee6](http://github.com/angular-ui/bootstrap/commit/88c94ee6))  
  - make sure tooltip scope is evicted from cache ([9246905a](http://github.com/angular-ui/bootstrap/commit/9246905a))  
- **typeahead:** 
  - return focus to the input after selecting a suggestion ([04a21e33](http://github.com/angular-ui/bootstrap/commit/04a21e33))   

## Breaking Changes

- **pagination:** 
 The 'first-text', 'previous-text', 'next-text' and 'last-text'
  attributes are now binded to parent scope.

  To migrate your code, surround the text of these attributes with quotes.

  Before:
      
    ```html
    <pagination first-text="<<"></pagination>
    ```

  After:
    
    ```html
    <pagination first-text="'<<'"></pagination>
    ```

- **progressbar:** 
 The 'value' is replaced by 'percent'.

  Before:
    
    ```html
    <progress value="..."></progress>
    ```

  After:
    
    ```html
    <progress percent="..."></progress>
    ```

- **tabs:** 
 The 'tabs' directive has been renamed to 'tabset', and
 the 'pane' directive has been renamed to 'tab'.

    To migrate your code, follow the example below.

  Before:

    ```html
    <tabs>
      <pane heading="one">
        First Content
      </pane>
      <pane ng-repeat="apple in basket" heading="{{apple.heading}}">
        {{apple.content}}
      </pane>
    </tabs>
    ```

  After:

    ```html
    <tabset>
      <tab heading="one">
        First Content
      </tab>
      <tab ng-repeat="apple in basket" heading="{{apple.heading}}">
        {{apple.content}}
      </tab>
    </tabset>
    ```

 
# 0.3.0 (2013-04-30)

## Features

- **progressbar:**
  - add progressbar directive ([261f2072](https://github.com/angular-ui/bootstrap/commit/261f2072))
- **rating:**
  - add rating directive ([6b5e6369](https://github.com/angular-ui/bootstrap/commit/6b5e6369))
- **typeahead:**
  - support the editable property ([a40c3fbe](https://github.com/angular-ui/bootstrap/commit/a40c3fbe))
  - support typeahead-loading bindable expression ([b58c9c88](https://github.com/angular-ui/bootstrap/commit/b58c9c88))
- **tooltip:**
  - added popup-delay option ([a79a2ba8](https://github.com/angular-ui/bootstrap/commit/a79a2ba8))
  - added appendToBody to $tooltip ([1ee467f8](https://github.com/angular-ui/bootstrap/commit/1ee467f8))
  - added tooltip-html-unsafe directive ([45ed2805](https://github.com/angular-ui/bootstrap/commit/45ed2805))
  - support for custom triggers ([b1ba821b](https://github.com/angular-ui/bootstrap/commit/b1ba821b))

## Bug Fixes

- **alert:**
  - don't show close button if no close callback specified ([c2645f4a](https://github.com/angular-ui/bootstrap/commit/c2645f4a))
- **carousel:**
  - Hide navigation indicators if only one slide ([aedc0565](https://github.com/angular-ui/bootstrap/commit/aedc0565))
- **collapse:**
  - remove reference to msTransition for IE10 ([55437b16](https://github.com/angular-ui/bootstrap/commit/55437b16))
- **dialog:**
  - set _open to false on init ([dcc9ef31](https://github.com/angular-ui/bootstrap/commit/dcc9ef31))
  - close dialog on location change ([474ce52e](https://github.com/angular-ui/bootstrap/commit/474ce52e))
  - IE8 fix to not set data() against text nodes ([a6c540e5](https://github.com/angular-ui/bootstrap/commit/a6c540e5))
  - fix $apply in progres on $location change ([77e6acb9](https://github.com/angular-ui/bootstrap/commit/77e6acb9))
- **tabs:**
  - remove superfluous href from tabs template ([38c1badd](https://github.com/angular-ui/bootstrap/commit/38c1badd))
- **tooltip:**
  - fix positioning issues in tooltips and popovers ([6458f487](https://github.com/angular-ui/bootstrap/commit/6458f487))
- **typeahead:**
  - close matches popup on click outside typeahead ([acca7dcd](https://github.com/angular-ui/bootstrap/commit/acca7dcd))
  - stop keydown event propagation when ESC pressed to discard matches ([22a00cd0](https://github.com/angular-ui/bootstrap/commit/22a00cd0))
  - correctly render initial model value ([929a46fa](https://github.com/angular-ui/bootstrap/commit/929a46fa))
  - correctly higlight matches if query contains regexp-special chars ([467afcd6](https://github.com/angular-ui/bootstrap/commit/467afcd6))
  - fix matches pop-up positioning issues ([74beecdb](https://github.com/angular-ui/bootstrap/commit/74beecdb))

# 0.2.0 (2013-03-03)

## Features

- **dialog:**
  - Make $dialog 'resolve' property to work the same way of $routeProvider.when ([739f86f](https://github.com/angular-ui/bootstrap/commit/739f86f))
- **modal:**
  - allow global override of modal options ([acaf72b](https://github.com/angular-ui/bootstrap/commit/acaf72b))
- **buttons:**
  - add checkbox and radio buttons ([571ccf4](https://github.com/angular-ui/bootstrap/commit/571ccf4))
- **carousel:**
  - add slide indicators ([3b677ee](https://github.com/angular-ui/bootstrap/commit/3b677ee))
- **typeahead:**
  - add typeahead directive ([6a97da2](https://github.com/angular-ui/bootstrap/commit/6a97da2))
- **accordion:**
  - enable HTML in accordion headings ([3afcaa4](https://github.com/angular-ui/bootstrap/commit/3afcaa4))
- **pagination:**
  - add first/last link & constant congif options ([0ff0454](https://github.com/angular-ui/bootstrap/commit/0ff0454))

## Bug fixes

- **dialog:**
  - update resolve section to new syntax ([1f87486](https://github.com/angular-ui/bootstrap/commit/1f87486))
  - $compile entire modal ([7575b3c](https://github.com/angular-ui/bootstrap/commit/7575b3c))
- **tooltip:**
  - don't show tooltips if there is no content to show ([030901e](https://github.com/angular-ui/bootstrap/commit/030901e))
  - fix placement issues ([a2bbf4d](https://github.com/angular-ui/bootstrap/commit/a2bbf4d))
- **collapse:**
  - Avoids fixed height on collapse ([ff5d119](https://github.com/angular-ui/bootstrap/commit/ff5d119))
- **accordion:**
  - fix minification issues ([f4da4d6](https://github.com/angular-ui/bootstrap/commit/f4da4d6))
- **typeahead:**
  -  update inputs value on mapping where label is not derived from the model ([a5f64de](https://github.com/angular-ui/bootstrap/commit/a5f64de))

# 0.1.0 (2013-02-02)

_Very first, initial release_.

## Features

Version `0.1.0` was released with the following directives:

* accordion
* alert
* carousel
* dialog
* dropdownToggle
* modal
* pagination
* popover
* tabs
* tooltip
