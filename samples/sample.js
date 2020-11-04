$(function () {

    function jsrc(fname){
        const urlroot = "https://wdingbox.github.io/assetjs"
        return `<script src='${urlroot}/${fname}'></script>\n`
    }
    function gen_src() {
        var ss=""
        var t = $(".hili").each(function () {
            var t = $(this).text()
            ss+=jsrc(t)
            console.log(t)
            
        })

        return ss;
    }

    $(".fname").on("click", function () {
        $(this).toggleClass("hili")
        $("#out").val(gen_src())
    })



})