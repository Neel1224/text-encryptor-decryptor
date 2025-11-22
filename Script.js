$(document).ready(function() {
    // Encryption function
    $("#encryptBtn").on("click", function() {
        var inputText = $("#inputText").val().trim();
        var secretKey = $("#secretKey").val().trim();

        if (!inputText) {
            showAlert("error", "Please enter text to encrypt!");
            return;
        }

        if (!secretKey) {
            showAlert("error", "Please enter a secret key!");
            return;
        }

        try {
            var encrypted = CryptoJS.AES.encrypt(inputText, secretKey).toString();
            $("#outputText").val(encrypted);
            showAlert("success", "Text encrypted successfully!");
        } catch (e) {
            showAlert("error", "Encryption failed: " + e.message);
        }
    });

    // Decryption function
    $("#decryptBtn").on("click", function() {
        var encryptedText = $("#inputText").val().trim();
        var secretKey = $("#secretKey").val().trim();

        if (!encryptedText) {
            showAlert("error", "Please enter text to decrypt!");
            return;
        }

        if (!secretKey) {
            showAlert("error", "Please enter a secret key!");
            return;
        }

        try {
            var bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
            var decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                showAlert("error", "Decryption failed! Wrong key or corrupted text.");
                return;
            }

            $("#outputText").val(decrypted);
            showAlert("success", "Text decrypted successfully!");
        } catch (e) {
            showAlert("error", "Decryption failed: " + e.message);
        }
    });

    // Copy to clipboard
    $("#copyBtn").on("click", function() {
        var outputText = $("#outputText").val();

        if (!outputText) {
            showAlert("error", "No text to copy!");
            return;
        }

        var tempInput = $("<input>");
        $("body").append(tempInput);
        tempInput.val(outputText).select();
        document.execCommand("copy");
        tempInput.remove();

        showAlert("success", "Copied to clipboard!");
    });

    // Clear all fields
    $("#clearBtn").on("click", function() {
        $("#inputText").val("");
        $("#outputText").val("");
        $("#secretKey").val("");
        showAlert("success", "All fields cleared!");
    });

    // Show alert messages
    function showAlert(type, message) {
        var alertClass = type === "success" ? "alert-success" : "alert-error";
        var alertHTML = '<div class="alert ' + alertClass + '">' + message + '</div>';
        
        $(".alert").remove();
        $(".container").prepend(alertHTML);
        
        setTimeout(function() {
            $(".alert").fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Keyboard shortcuts
    $(document).on("keydown", function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === "e") {
                e.preventDefault();
                $("#encryptBtn").click();
            }
            if (e.key === "d") {
                e.preventDefault();
                $("#decryptBtn").click();
            }
        }
    });
});
