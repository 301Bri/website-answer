// Add this route after the other routes
app.get('/download', (req, res) => {
  if (req.session.user) {
    // Replace 'path/to/your/file.txt' with the path to your file
    const filePath = 'path/to/your/file.txt';

    // Set the appropriate headers for the file download
    res.setHeader('Content-disposition', 'attachment; filename=file.txt');
    res.setHeader('Content-type', 'text/plain');

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.redirect('/');
  }
});
