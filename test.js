import test from 'ava';
import jummy from './';
import mock from 'mock-fs';

test(async function (t) {
    mock({
        'path/to/fake/dir': {
            'some-file.txt': 'file content here',
            'empty-dir':     {/** empty directory */}
        },
        'path/to/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
        'some/other/path':  {/** another empty directory */}
    });
    const first  = await jummy('path/to/fake/dir/*.*');
    const second = await jummy('path/**/*,*');
    t.not(first, second);
    mock.restore();
    t.end();
});
