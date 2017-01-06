# dat testing thing

A simple tool to test dat from `dat-next` -> `hypercore-archiver`.

Dat tester goes through these steps for a set of directories:

1. Create a Dat archive
2. Share the Dat archive
3. Create a hypercore-archiver
4. Add the Dat archive to the hypercore-archiver
5. Complete backup

And prints out the time for all of the above.

## Usage

### Installation

```
git clone git@github.com:joehand/dat-tester.git
cd dat-tester
npm install
```

### Running Tests

#### Set Up

Create a directory with subdirectories you'd like to test:

```
test-data
  - basic-dataset
  - big-dataset
  - zip-file
  - lots-of-small-files
```

Run `dat-tester` on the parent directory, `test-data`:

```
node cli.js test-data
```
