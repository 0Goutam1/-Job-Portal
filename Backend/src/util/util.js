const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const crypto = require("crypto");

const imageKit = new ImageKit({
    privateKey: process.env.ImageKit_Secrty,
});

const uploadToImageKit = async (fileBuffer, fileName, folderPath) => {

    const extension = fileName.split(".").pop();

    const uniqueFileName = `${crypto.randomUUID()}.${extension}`;

    const file = await toFile(fileBuffer, fileName);

    const response = await imageKit.files.upload({
        file: file,
        fileName: uniqueFileName,
        folder: folderPath,
    });

    return response.url;
};

module.exports = {
    uploadToImageKit,
};
