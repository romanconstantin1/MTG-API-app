"""empty message

Revision ID: cca0501ae253
Revises: 9ccd5bbd87e6
Create Date: 2023-06-10 12:32:51.170660

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cca0501ae253'
down_revision = '9ccd5bbd87e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_restricted', sa.String(length=10), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.drop_column('is_restricted')

    # ### end Alembic commands ###