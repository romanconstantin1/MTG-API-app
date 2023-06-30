"""empty message

Revision ID: dc22838027d7
Revises: cbb575e75f94
Create Date: 2023-06-30 19:16:54.946753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc22838027d7'
down_revision = 'cbb575e75f94'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('scryfall_id',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('scryfall_id',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###