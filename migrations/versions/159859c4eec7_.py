"""empty message

Revision ID: 159859c4eec7
Revises: 6d0ac16f2b65
Create Date: 2023-07-13 13:41:35.321119

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '159859c4eec7'
down_revision = '6d0ac16f2b65'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.drop_constraint('cards_scryfall_id_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.create_unique_constraint('cards_scryfall_id_key', ['scryfall_id'])

    # ### end Alembic commands ###
