"""empty message

Revision ID: ff7ab17536bd
Revises: dc22838027d7
Create Date: 2023-06-30 20:10:00.169771

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff7ab17536bd'
down_revision = 'dc22838027d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('card_sides', schema=None) as batch_op:
        batch_op.add_column(sa.Column('side_artist', sa.String(length=120), nullable=False))
        batch_op.drop_column('side_cmc')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('card_sides', schema=None) as batch_op:
        batch_op.add_column(sa.Column('side_cmc', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_column('side_artist')

    # ### end Alembic commands ###
