print "Window Builds"
go build -o ../backend_window.exe
print "Done"
print "Mac Builds"
GOOS=darwin GOARCH=arm64 go build -o ../backend_mac
echo Done
