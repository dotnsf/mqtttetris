var COLS = 10, ROWS = 20;  // ��10�A�c20�}�X
var board = [];  // �Ֆʏ��
var lose;  // ��ԏ�܂ł�������������ǂ���
var interval;  // �Q�[�������s����^�C�}�[��ێ�����ϐ�
var current; // �����삵�Ă���u���b�N�̌`
var currentX, currentY; // �����삵�Ă���u���b�N�̈ʒu

// ���삷��u���b�N�̃p�^�[��
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];

// �u���b�N�̐F
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];


// �Ֆʂ���ɂ���
function init() {
  for ( var y = 0; y < ROWS; ++y ) {
    board[ y ] = [];
    for ( var x = 0; x < COLS; ++x ) {
      board[ y ][ x ] = 0;
    }
  }
}

// shapes���烉���_���Ƀu���b�N�̃p�^�[�����o�͂��A�Ֆʂ̈�ԏ�փZ�b�g����
function newShape() {
  var id = Math.floor( Math.random() * shapes.length );  // �����_���ɃC���f�b�N�X���o��
  var shape = shapes[ id ];
  // �p�^�[���𑀍�u���b�N�փZ�b�g����
  current = [];
  for ( var y = 0; y < 4; ++y ) {
    current[ y ] = [];
    for ( var x = 0; x < 4; ++x ) {
      var i = 4 * y + x;
      if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
        current[ y ][ x ] = id + 1;
      }
      else {
        current[ y ][ x ] = 0;
      }
    }
  }
  // �u���b�N��Ֆʂ̏�̂ق��ɃZ�b�g����
  currentX = 5;
  currentY = 0;
}

function tick() {
  // �P���ֈړ�����
  if ( valid( 0, 1 ) ) {
    ++currentY;
  }
  // �������n���Ă�����(�P�����Ƀu���b�N����������)
  else {
    freeze();  // ����u���b�N��Ֆʂ֌Œ肷��
    clearLines();  // ���C����������
    if (lose) {
      // �����Q�[���I�[�o�Ȃ�ŏ�����n�߂�
      newGame();
      return false;
    }
    // �V��������u���b�N���Z�b�g����
    newShape();
  }
}

// �w�肳�ꂽ�����ɁA����u���b�N�𓮂����邩�ǂ����`�F�b�N����
// �Q�[���I�[�o�[����������ōs��
function valid( offsetX, offsetY, newCurrent ) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( newCurrent[ y ][ x ] ) {
        if ( typeof board[ y + offsetY ] == 'undefined'
             || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
             || board[ y + offsetY ][ x + offsetX ]
             || x + offsetX < 0
             || y + offsetY >= ROWS
             || x + offsetX >= COLS ) {
                    if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1) {
                        console.log('game over');
                        lose = true; // ��������u���b�N���Ֆʂ̏�ɂ�������Q�[���I�[�o�[�ɂ���
                    }
               return false;
             }
      }
    }
  }
  return true;
}

// ����u���b�N��ՖʂɃZ�b�g����֐�
function freeze() {
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( current[ y ][ x ] ) {
        board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
      }
    }
  }
}

// ��s�������Ă��邩���ׁA�����Ă����炻��������
function clearLines() {
  for ( var y = ROWS - 1; y >= 0; --y ) {
    var rowFilled = true;
    // ��s�������Ă��邩���ׂ�
    for ( var x = 0; x < COLS; ++x ) {
      if ( board[ y ][ x ] == 0 ) {
        rowFilled = false;
        break;
      }
    }
    // ������s�����Ă�����, �T�E���h��炵�Ă����������B
    if ( rowFilled ) {
      document.getElementById( 'clearsound' ).play();  // ���ŃT�E���h��炷
      // ���̏�ɂ������u���b�N��������Ƃ��Ă���
      for ( var yy = y; yy > 0; --yy ) {
        for ( var x = 0; x < COLS; ++x ) {
          board[ yy ][ x ] = board[ yy - 1 ][ x ];
        }
      }
      ++y;  // ��s���Ƃ����̂Ń`�F�b�N����������֑���
    }
  }
}




function newGame() {
  clearInterval(interval);  // �Q�[���^�C�}�[���N���A
  init();  // �Ֆʂ��܂�����ɂ���
  newShape();  // ����u���b�N���Z�b�g
  lose = false;  // �����t���b�O
  interval = setInterval( tick, 500 );  // 250�~���b���Ƃ�tick�Ƃ����֐����Ăяo��
}

newGame();
