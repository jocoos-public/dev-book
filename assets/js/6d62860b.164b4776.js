"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6885],{8605:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>c});var s=o(4848),n=o(8453);const t={sidebar_position:4},d="Video Post",r={id:"key-concepts/video-posts",title:"Video Post",description:"A Video Post is a unit used to manage videos in the form of posts, allowing users to share video content. When viewing shared videos, they need to be viewed in a compressed format to save network bandwidth, which requires a transcoding process. Therefore, even if the purpose is not to share the video but rather to transcode it, a Video Post should be used.",source:"@site/docs/2-key-concepts/video-posts.md",sourceDirName:"2-key-concepts",slug:"/key-concepts/video-posts",permalink:"/dev-book/key-concepts/video-posts",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Transcoding Profile",permalink:"/dev-book/key-concepts/transcoding-profiles"},next:{title:"Video Room",permalink:"/dev-book/key-concepts/video-rooms"}},l={},c=[{value:"How to Use Video Post",id:"how-to-use-video-post",level:2},{value:"Video Post Properties and Creation",id:"video-post-properties-and-creation",level:3},{value:"Additional Settings for Video Post",id:"additional-settings-for-video-post",level:3},{value:"Uploading the Original Video File to Video Post",id:"uploading-the-original-video-file-to-video-post",level:3},{value:"Transcoding Process",id:"transcoding-process",level:3},{value:"Video Post Status",id:"video-post-status",level:2}];function a(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",mermaid:"mermaid",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"video-post",children:"Video Post"})}),"\n",(0,s.jsxs)(i.p,{children:["A ",(0,s.jsx)(i.code,{children:"Video Post"})," is a unit used to manage videos in the form of posts, allowing users to share video content. When viewing shared videos, they need to be viewed in a compressed format to save network bandwidth, which requires a transcoding process. Therefore, even if the purpose is not to share the video but rather to transcode it, a ",(0,s.jsx)(i.code,{children:"Video Post"})," should be used."]}),"\n",(0,s.jsx)(i.h2,{id:"how-to-use-video-post",children:"How to Use Video Post"}),"\n",(0,s.jsxs)(i.p,{children:["The steps to use a ",(0,s.jsx)(i.code,{children:"Video Post"})," are as follows:"]}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsxs)(i.li,{children:["Create a ",(0,s.jsx)(i.code,{children:"Video Post"})]}),"\n",(0,s.jsxs)(i.li,{children:["Additional settings for the ",(0,s.jsx)(i.code,{children:"Video Post"})]}),"\n",(0,s.jsxs)(i.li,{children:["Upload the original video file to the ",(0,s.jsx)(i.code,{children:"Video Post"})]}),"\n",(0,s.jsx)(i.li,{children:"Automatic transcoding of the uploaded original video file"}),"\n",(0,s.jsx)(i.li,{children:"Viewing the transcoded video output"}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Details for each step are as follows:"}),"\n",(0,s.jsx)(i.h3,{id:"video-post-properties-and-creation",children:"Video Post Properties and Creation"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"Video Post"})," has the following properties:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Required Properties at Creation"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"appUserId"}),": The creator and owner of the ",(0,s.jsx)(i.code,{children:"Video Post"}),". When using the server API, this must be specified; when using the client API, the member making the request becomes the creator, so it doesn\u2019t need to be explicitly specified."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Read-Only Properties"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"videoPostState"}),": The state of the ",(0,s.jsx)(i.code,{children:"Video Post"})," based on its lifecycle."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Read/Write Properties"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"title"}),": Title"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"description"}),": Description"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"accessLevel"}),": Access restriction level, currently only supports ",(0,s.jsx)(i.code,{children:"PUBLIC"})," (open to everyone)."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"videoTranscodingProfileId"}),": The ID of the transcoding profile to use for the original video file. If not set, the default value is used, and this cannot be changed once transcoding starts."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"thumbnailTranscodingProfileId"}),": The ID of the transcoding profile to use for extracting the thumbnail. If not set, no thumbnail is extracted, and this cannot be changed once transcoding starts."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"previewTranscodingProfileId"}),": The ID of the transcoding profile to use for extracting the preview. If not set, no preview is extracted, and this cannot be changed once transcoding starts."]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"customData"}),": A property for storing arbitrary information in a key-value pair object format."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.p,{children:["By setting these properties, a ",(0,s.jsx)(i.code,{children:"Video Post"})," with a status of ",(0,s.jsx)(i.code,{children:"CREATED"})," is generated."]}),"\n",(0,s.jsx)(i.h3,{id:"additional-settings-for-video-post",children:"Additional Settings for Video Post"}),"\n",(0,s.jsxs)(i.p,{children:["After creating a ",(0,s.jsx)(i.code,{children:"Video Post"}),", most attributes can be modified except for those related to the transcoding profiles. Additionally, thumbnails and previews can be extracted using transcoding profiles, or files can be directly uploaded for these settings."]}),"\n",(0,s.jsx)(i.h3,{id:"uploading-the-original-video-file-to-video-post",children:"Uploading the Original Video File to Video Post"}),"\n",(0,s.jsxs)(i.p,{children:["When uploading an original video to a ",(0,s.jsx)(i.code,{children:"Video Post"}),", you first need to request an upload URL through the API. You can specify the number of parts the file will be divided into for the upload. Depending on the specified number of parts, the API will respond with the upload URLs. After uploading each file part to its respective URL, call the upload completion API. The ",(0,s.jsx)(i.code,{children:"Video Post"})," status changes to ",(0,s.jsx)(i.code,{children:"UPLOADED"}),", and once ",(0,s.jsx)(i.strong,{children:"FlipFlop Cloud"})," combines the uploaded parts into a single file, a transcoding job is internally requested, changing the status to ",(0,s.jsx)(i.code,{children:"QUEUED"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"transcoding-process",children:"Transcoding Process"}),"\n",(0,s.jsxs)(i.p,{children:["When the transcoder starts processing, the ",(0,s.jsx)(i.code,{children:"Video Post"})," status changes to ",(0,s.jsx)(i.code,{children:"PROCESSING"}),", and once the process is completed, the status changes to ",(0,s.jsx)(i.code,{children:"PROCESSED"}),". When querying a ",(0,s.jsx)(i.code,{children:"Video Post"})," with completed transcoding, the ",(0,s.jsx)(i.code,{children:"file"})," attribute contains information about the original file, transcoded output, thumbnail, and preview files."]}),"\n",(0,s.jsx)(i.h2,{id:"video-post-status",children:"Video Post Status"}),"\n",(0,s.jsxs)(i.p,{children:["A ",(0,s.jsx)(i.code,{children:"Video Post"})," can have the following statuses:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Normal Statuses"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"CREATED"})," - Created"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"UPLOADED"})," - Uploaded"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"QUEUED"})," - Transcoding request for the original video file completed (original viewable)"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"PROCESSING"})," - Transcoding in progress (original viewable)"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"PROCESSED"})," - Transcoding complete (both original and transcoded versions viewable)"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Error Statuses"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"FAILED_UPLOAD"})," - Upload failed (not viewable)"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"FAILED_QUEUING"})," - Transcoding request failed (original viewable)"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"FAILED_PROCESSING"})," - Transcoding failed (original viewable)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"The flow of statuses is as follows:"}),"\n",(0,s.jsx)(i.mermaid,{value:"stateDiagram-v2\n    [*] --\x3e CREATED\n    CREATED --\x3e UPLOADED\n    UPLOADED --\x3e QUEUED\n    FAILED_QUEUING --\x3e QUEUED: retry transcoding request\n    QUEUED --\x3e PROCESSING\n    PROCESSING --\x3e PROCESSED\n    PROCESSED --\x3e [*]\n    UPLOADED --\x3e FAILED_QUEUING\n    PROCESSING --\x3e FAILED_PROCESSING\n    FAILED_PROCESSING --\x3e PROCESSING: retry transcoding"})]})}function h(e={}){const{wrapper:i}={...(0,n.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,i,o)=>{o.d(i,{R:()=>d,x:()=>r});var s=o(6540);const n={},t=s.createContext(n);function d(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);