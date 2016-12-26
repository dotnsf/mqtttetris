/*
 ���݂̔Ֆʂ̏�Ԃ�`�悷�鏈��
 */
var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];  // �L�����o�X
var ctx = canvas.getContext( '2d' ); // �R���e�N�X�g
var W = 300, H = 600;  // �L�����o�X�̃T�C�Y
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;  // �}�X�̕���ݒ�

// x, y�̕����փ}�X��`�悷�鏈��
function drawBlock( x, y ) {
  ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
  ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

// �ՖʂƑ���u���b�N��`�悷��
function render() {
  ctx.clearRect( 0, 0, W, H );  // ��x�L�����o�X��^������ɂ���
  ctx.strokeStyle = 'black';  // ����҂̐F�����ɂ���

  // �Ֆʂ�`�悷��
  for ( var x = 0; x < COLS; ++x ) {
    for ( var y = 0; y < ROWS; ++y ) {
      if ( board[ y ][ x ] ) {  // �}�X����A�܂�0�ł͂Ȃ�������
        ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];  // �}�X�̎�ނɍ��킹�ēh��Ԃ��F��ݒ�
        drawBlock( x, y );  // �}�X��`��
      }
    }
  }

  // ����u���b�N��`�悷��
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( current[ y ][ x ] ) {
        ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];  // �}�X�̎�ނɍ��킹�ēh��Ԃ��F��ݒ�
        drawBlock( currentX + x, currentY + y );  // �}�X��`��
      }
    }
  }
}

// 30�~���b���Ƃɏ�Ԃ�`�悷��֐����Ăяo��
setInterval( render, 30 );

