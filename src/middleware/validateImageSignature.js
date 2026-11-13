const fs = require('fs');
const path = require('path');

// Expected JPEG signature
const jpegSignature = Buffer.from([
    0xFF, 0xD8, 0xFF
]);

// Expected PNG signature
const pngSignature = Buffer.from([
    0x89, 0x50, 0x4E, 0x47,
    0x0D, 0x0A, 0x1A, 0x0A
]);

async function validateImageSignature(req, res, next) {

    // Check if a file was uploaded
    if (!req.file) {
        return next();
    }

    const filePath = req.file.path;

    let fileHandle;

    try {

        // Open uploaded file
        fileHandle = await fs.promises.open(filePath, 'r');

        // Allocate space for 8 bytes
        const buffer = Buffer.alloc(8);

        // Read the first 8 bytes
        const { bytesRead } = await fileHandle.read(
            buffer,
            0,
            8,
            0
        );

        // Extract actual bytes
        const signature = buffer.subarray(0, bytesRead);

        // Check JPEG signature
        const isJPEG =
            signature.length >= 3 &&
            signature.subarray(0, 3).equals(jpegSignature);

        // Check PNG signature
        const isPNG =
            signature.length === 8 &&
            signature.equals(pngSignature);

        console.log(
            "Actual file signature:",
            signature.toString('hex')
        );

        // Reject invalid files
        if (!isJPEG && !isPNG) {

            await fileHandle.close();
            fileHandle = null;

            await fs.promises.unlink(filePath);

            return res.status(400).json({
                success: false,
                message: "Invalid image file. Only genuine JPEG and PNG images are allowed."
            });
        }

        // Determine the correct extension
        const correctExtension = isJPEG ? '.jpg' : '.png';

        // Close file before renaming
        await fileHandle.close();
        fileHandle = null;

        // Get current extension
        const currentExtension = path.extname(filePath).toLowerCase();

        // Correct extension if necessary
        if (currentExtension !== correctExtension) {

            const correctedPath = path.join(
                path.dirname(filePath),
                path.basename(filePath, path.extname(filePath)) + correctExtension
            );

            await fs.promises.rename(filePath, correctedPath);

            // Update Multer file information
            req.file.path = correctedPath;
            req.file.filename = path.basename(correctedPath);
        }

        // Continue to controller
        return next();

    } catch (error) {

        console.error("Image signature validation error:", error);

        // Delete uploaded file if an error occurs
        try {
            await fs.promises.unlink(req.file.path);
        } catch (cleanupError) {
            console.error("File cleanup failed:", cleanupError);
        }

        return next(error);

    } finally {

        // Close file if it is still open
        if (fileHandle) {
            await fileHandle.close();
        }
    }
}

module.exports = validateImageSignature;